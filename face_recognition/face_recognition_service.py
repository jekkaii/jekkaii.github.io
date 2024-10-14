import os
import numpy as np
from face_loading import FaceLoading
from face_recognition_model import FaceRecognitionModel

class FaceRecognitionService:
    def __init__(self):
        self.face_recognition_model = FaceRecognitionModel()
        self.model_loaded = False
        self.model_trained = False  

    def train(self):
        train_directory = os.path.join(os.getcwd(), f'cc_pictures/train')
        face_loader_train = FaceLoading(directory=train_directory)
        X_train, y_train = face_loader_train.load_classes(multiple=False)
        X_train_embeddings = self.face_recognition_model.embed_faces(X_train)
        self.face_recognition_model.train_model(X_train_embeddings, y_train)
        self.model_trained = True  

        return {"status": "Training completed"}

    def test(self):
        test_directory = os.path.join(os.getcwd(), f'cc_pictures/test')
        face_loader_test = FaceLoading(directory=test_directory)
        X_test, y_test = face_loader_test.load_classes(multiple=False)
        y_pred_test = self.face_recognition_model.predict(X_test)

        correct_predictions = sum([1 for actual, predicted in zip(y_test, y_pred_test) if actual == predicted[0]])
        total_predictions = len(y_test)
        accuracy = (correct_predictions / total_predictions) * 100 if total_predictions > 0 else 0

        return {
            "total_test_samples": total_predictions,
            "correct_predictions": correct_predictions,
            "accuracy (%)": accuracy
        }

    def validate(self, group_photo):
        if self.face_recognition_model.model is None or self.face_recognition_model.encoder is None:
            return {"error": "No active model. Please load or set an active model before performing validation."}

        val_directory = os.path.join(os.getcwd(), f'cc_pictures/class_picture/{group_photo}')
        face_loader_validation = FaceLoading(directory=val_directory)

        group_faces = face_loader_validation.extract_faces(val_directory, multiple=True)
        predicted_labels = self.face_recognition_model.predict(group_faces)

        results = [{"Face": i + 1, "Predicted label": label[0], "Confidence (%)": round(label[1], 2)} 
                   for i, label in enumerate(predicted_labels)]

        return results
    
    def save_model(self, model_name: str):
        if self.model_trained:
            self.face_recognition_model.save_model(self.face_recognition_model.model, self.face_recognition_model.encoder, model_name)
            return {"message": f"Model '{model_name}' has been saved successfully."}
        else:
            return {"error": "No trained model to save. Please train the model first."}

    def load_model(self, model_name: str):
        load_status = self.face_recognition_model.load_model(model_name)
        
        if load_status is None:
            return {"error": "Failed to load the model"}
        
        if 'error' not in load_status:
            self.model_loaded = True
            return {"message": f"Model '{model_name}' has been loaded successfully."}
        
        return load_status