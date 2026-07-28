import os
import uuid
import shutil
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User
from app.models.scan import Scan
from app.schemas.scan import ScanResponse

import cv2
import numpy as np
from app.services.cv import ModularCVPipeline

router = APIRouter()

# Static directory config inside the api/endpoints file is handled,
# but we will store files in a folder named "static/uploads"
UPLOAD_DIR = os.path.join("static", "uploads")


@router.post("/upload", response_model=ScanResponse, status_code=status.HTTP_201_CREATED)
async def upload_crop_image(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    crop_type: str = Form(...),
    image: UploadFile = File(...)
) -> Any:
    """
    Upload a leaf image, segment the leaf body, calculate severity indexes,
    and highlight infected regions using the active computer vision pipeline.
    """
    # Create upload folder if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Secure filename creation
    file_extension = os.path.splitext(image.filename)[1].lower()
    if file_extension not in [".jpg", ".jpeg", ".png", ".webp"]:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload JPG, PNG, or WEBP."
        )
        
    unique_id = uuid.uuid4()
    orig_filename = f"original_{unique_id}{file_extension}"
    highlighted_filename = f"highlighted_{unique_id}.png"
    
    orig_path = os.path.join(UPLOAD_DIR, orig_filename)
    high_path = os.path.join(UPLOAD_DIR, highlighted_filename)
    
    # Read raw image bytes
    try:
        image_bytes = await image.read()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not read upload stream: {str(e)}"
        )
        
    # Write original image to disk
    try:
        with open(orig_path, "wb") as buffer:
            buffer.write(image_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not write original image: {str(e)}"
        )

    # 2. Run Modular Computer Vision Pipeline
    try:
        cv_result = ModularCVPipeline.predict(image_bytes, crop_type)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Computer Vision pipeline processing failed: {str(e)}"
        )

    # 3. Save the highlighted processed OpenCV image matrix to disk
    processed_img = cv_result["processed_image"]
    try:
        cv2.imwrite(high_path, processed_img)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not save highlighted image outputs: {str(e)}"
        )
        
    # Relative path URLs for client consumption
    image_url = f"/static/uploads/{orig_filename}"
    highlighted_image_url = f"/static/uploads/{highlighted_filename}"
    
    # Save parameters to PostgreSQL / SQLite database
    db_scan = Scan(
        user_id=current_user.id,
        crop_type=crop_type,
        image_url=image_url,
        highlighted_image_url=highlighted_image_url,
        disease_name=cv_result["disease_name"],
        confidence_score=cv_result["confidence_score"],
        severity=cv_result["severity"],
        diagnosis_details=cv_result["diagnosis_details"],
        possible_causes=cv_result["possible_causes"],
        treatment_plan=cv_result["treatment_plan"],
        recommended_steps=cv_result["recommended_steps"]
    )
    db.add(db_scan)
    db.commit()
    db.refresh(db_scan)
    return db_scan


@router.get("/", response_model=List[ScanResponse])
def get_scans_history(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve all scans processed by the current user.
    """
    scans = (
        db.query(Scan)
        .filter(Scan.user_id == current_user.id)
        .order_by(Scan.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return scans


@router.get("/{scan_id}", response_model=ScanResponse)
def get_scan_by_id(
    scan_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Get detailed breakdown of a single scan by its unique ID.
    """
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan record not found"
        )
    if scan.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this scan record"
        )
    return scan
