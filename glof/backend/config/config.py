import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
API_VERSION = "1.0.0"
API_PREFIX = "/api/v1"

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./glof.db")

# JWT Configuration
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Model Configuration
MODEL_PATH = os.getenv("MODEL_PATH", "models/glof_model.h5")
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

# Alert Configuration
ALERT_THRESHOLD = 0.7  # Risk level threshold for sending alerts
ALERT_COOLDOWN_MINUTES = 60  # Minimum time between alerts for the same location

# Satellite Data Configuration
SATELLITE_API_KEY = os.getenv("SATELLITE_API_KEY", "")
SATELLITE_API_URL = os.getenv("SATELLITE_API_URL", "https://api.satellite-data.com")

# Mobile App Configuration
FCM_SERVER_KEY = os.getenv("FCM_SERVER_KEY", "")  # Firebase Cloud Messaging key

# Logging Configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = "logs/glof.log"

# Create necessary directories
os.makedirs("logs", exist_ok=True)
os.makedirs("models", exist_ok=True)
os.makedirs("data", exist_ok=True) 