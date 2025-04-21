import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
from typing import Tuple, Optional

class ImageProcessor:
    @staticmethod
    def download_image(url: str) -> Optional[np.ndarray]:
        """
        Download image from URL and convert to numpy array
        
        Args:
            url: URL of the image
            
        Returns:
            numpy array of the image or None if download fails
        """
        try:
            response = requests.get(url)
            image = Image.open(BytesIO(response.content))
            return np.array(image)
        except Exception as e:
            print(f"Error downloading image: {e}")
            return None
    
    @staticmethod
    def enhance_image(image: np.ndarray) -> np.ndarray:
        """
        Enhance image quality for better feature detection
        
        Args:
            image: numpy array of the image
            
        Returns:
            Enhanced image as numpy array
        """
        # Convert to grayscale if image is color
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        else:
            gray = image
            
        # Apply adaptive histogram equalization
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(gray)
        
        # Apply Gaussian blur to reduce noise
        enhanced = cv2.GaussianBlur(enhanced, (3,3), 0)
        
        return enhanced
    
    @staticmethod
    def detect_glacial_features(image: np.ndarray) -> Tuple[np.ndarray, dict]:
        """
        Detect key glacial features in the image
        
        Args:
            image: numpy array of the image
            
        Returns:
            Tuple of (processed image, feature dictionary)
        """
        # Convert to grayscale if needed
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        else:
            gray = image
            
        # Edge detection
        edges = cv2.Canny(gray, 50, 150)
        
        # Find contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Extract features
        features = {
            'num_contours': len(contours),
            'total_area': sum(cv2.contourArea(c) for c in contours),
            'max_contour_area': max([cv2.contourArea(c) for c in contours]) if contours else 0
        }
        
        # Draw contours on original image
        result = image.copy()
        cv2.drawContours(result, contours, -1, (0, 255, 0), 2)
        
        return result, features
    
    @staticmethod
    def extract_metadata(image: np.ndarray) -> dict:
        """
        Extract metadata from the image
        
        Args:
            image: numpy array of the image
            
        Returns:
            Dictionary containing image metadata
        """
        return {
            'shape': image.shape,
            'dtype': str(image.dtype),
            'min_value': float(np.min(image)),
            'max_value': float(np.max(image)),
            'mean_value': float(np.mean(image)),
            'std_value': float(np.std(image))
        } 