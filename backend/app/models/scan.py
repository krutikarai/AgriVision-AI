from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    crop_type = Column(String, nullable=False, index=True)
    image_url = Column(String, nullable=False)
    highlighted_image_url = Column(String, nullable=True)
    disease_name = Column(String, nullable=False, index=True)
    confidence_score = Column(Float, nullable=False)
    severity = Column(Float, nullable=True)
    diagnosis_details = Column(Text, nullable=True)
    possible_causes = Column(Text, nullable=True)
    treatment_plan = Column(Text, nullable=True)
    recommended_steps = Column(Text, nullable=True)
    created_at = Column(
        DateTime, 
        default=lambda: datetime.now(timezone.utc), 
        nullable=False
    )

    # Relationships
    owner = relationship("User", back_populates="scans")
