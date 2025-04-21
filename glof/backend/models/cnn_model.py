import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

class GLOFPredictor:
    def __init__(self):
        self.model = self._build_model()
        
    def _build_model(self):
        model = models.Sequential([
            # Input layer
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
            layers.MaxPooling2D((2, 2)),
            
            # First convolutional block
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            
            # Second convolutional block
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            
            # Third convolutional block
            layers.Conv2D(256, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            
            # Flatten and dense layers
            layers.Flatten(),
            layers.Dense(512, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(256, activation='relu'),
            layers.Dropout(0.3),
            
            # Output layer (risk level prediction)
            layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def preprocess_image(self, image):
        # Resize image to 224x224
        image = tf.image.resize(image, (224, 224))
        # Normalize pixel values
        image = image / 255.0
        return image
    
    def predict(self, image):
        """
        Predict GLOF risk level from an image
        
        Args:
            image: numpy array of shape (height, width, channels)
            
        Returns:
            float: risk level between 0 and 1
            float: confidence score
        """
        # Preprocess the image
        processed_image = self.preprocess_image(image)
        processed_image = tf.expand_dims(processed_image, 0)
        
        # Make prediction
        prediction = self.model.predict(processed_image)[0][0]
        
        # Calculate confidence (distance from 0.5)
        confidence = abs(prediction - 0.5) * 2
        
        return prediction, confidence
    
    def train(self, train_data, train_labels, validation_data=None, epochs=10):
        """
        Train the model on a dataset
        
        Args:
            train_data: numpy array of training images
            train_labels: numpy array of training labels
            validation_data: tuple of (val_images, val_labels)
            epochs: number of training epochs
        """
        history = self.model.fit(
            train_data,
            train_labels,
            validation_data=validation_data,
            epochs=epochs,
            batch_size=32
        )
        return history 