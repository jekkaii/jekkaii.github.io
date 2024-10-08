import os
import numpy as np
from face_loading import FaceLoading
from face_recognition_model import FaceRecognitionModel

class FaceRecognitionService:
    def __init__(self):
        self.face_recognition_model = FaceRecognitionModel()
        self.model_loaded = False

    def train(self, train_directory: str, class_code: str):
        face_loader_train = FaceLoading(directory=train_directory)
        X_train, y_train = face_loader_train.load_classes(multiple=False)
        X_train_embeddings = self.face_recognition_model.embed_faces(X_train)
        self.face_recognition_model.train_model(X_train_embeddings, y_train)
        self.face_recognition_model.save_models(self.face_recognition_model.model, self.face_recognition_model.encoder, class_code)
        self.model_loaded = True

        return {"status": "Training completed"}

    def test(self, test_directory: str):
        face_loader_test = FaceLoading(directory=test_directory)
        X_test, y_test = face_loader_test.load_classes(multiple=False)
        y_pred_test = self.face_recognition_model.predict(X_test)   
        results = [{"Actual": actual, "Predicted": predicted} for actual, predicted in zip(y_test, y_pred_test)]
        
        return results

    def validate(self, val_directory: str, class_code: str):
        face_loader_validation = FaceLoading(directory=val_directory)

        if not self.model_loaded:
            self.face_recognition_model.load_models(class_code)
            self.model_loaded = True
        
        group_faces = face_loader_validation.extract_faces(val_directory, multiple=True)
        predicted_labels = self.face_recognition_model.predict(group_faces)
        
        return [{"Face": i + 1, "Predicted label": label} for i, label in enumerate(predicted_labels)]