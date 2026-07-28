from abc import ABC, abstractmethod
import numpy as np


class BaseCVModel(ABC):
    @abstractmethod
    def predict(self, image_bytes: bytes, crop_type: str) -> dict:
        """
        Processes crop leaf image, runs segmentation, classification,
        severity estimation, and returns metadata along with the 
        processed highlighted OpenCV image array.
        
        Returns:
            dict containing:
                - disease_name: str
                - confidence_score: float
                - severity: float (0.0 - 1.0)
                - diagnosis_details: str
                - possible_causes: str
                - treatment_plan: str
                - recommended_steps: str
                - processed_image: np.ndarray (OpenCV BGR image matrix with bounding box annotations)
        """
        pass
