from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


# Shared properties
class ScanBase(BaseModel):
    crop_type: str
    image_url: str
    highlighted_image_url: Optional[str] = None
    disease_name: str
    confidence_score: float
    severity: Optional[float] = None
    diagnosis_details: Optional[str] = None
    possible_causes: Optional[str] = None
    treatment_plan: Optional[str] = None
    recommended_steps: Optional[str] = None


# Properties to receive via API on creation
class ScanCreate(ScanBase):
    pass


# Properties to return to client
class ScanResponse(ScanBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
