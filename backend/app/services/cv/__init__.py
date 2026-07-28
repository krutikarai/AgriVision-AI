from app.services.cv.base import BaseCVModel
from app.services.cv.opencv_pipeline import OpenCVPipeline
from app.services.cv.pytorch_pipeline import PyTorchPipeline

# Swappable CV model selection
# To replace the model, change this variable to instantiate another subclass of BaseCVModel (e.g., PyTorchPipeline())
ModularCVPipeline: BaseCVModel = OpenCVPipeline()

__all__ = ["BaseCVModel", "ModularCVPipeline", "OpenCVPipeline", "PyTorchPipeline"]
