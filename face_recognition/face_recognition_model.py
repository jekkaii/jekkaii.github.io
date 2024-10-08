import os
import numpy as np
import joblib
import tensorflow as tf
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from keras_facenet import FaceNet

class FaceRecognitionModel:
    def __init__(self):
        self.facenet = FaceNet()  
        self.encoder = LabelEncoder()
        self.model = None
        self.similarity_threshold = 0.5 

    def embed_faces(self, faces):
        return self.facenet.embeddings(faces)

    def train_model(self, X_train, y_train):
        y_train_enc = self.encoder.fit_transform(y_train)
        self.model = SVC(kernel='linear', probability=True)
        self.model.fit(X_train, y_train_enc)

    def predict(self, faces):
        X_test_embeddings = self.embed_faces(faces)
        predictions = []
        
        for test_embedding in X_test_embeddings:
            closest_label, similarity = self.find_closest_label(test_embedding)
            if similarity < self.similarity_threshold:
                predictions.append("Unknown")
            else:
                predictions.append(closest_label)
        
        return predictions
    
    def find_closest_label(self, test_embedding):
        known_embeddings = self.model.support_vectors_  
        similarities = cosine_similarity([test_embedding], known_embeddings)[0]  
        max_similarity_index = np.argmax(similarities)
        closest_label_enc = self.model.predict([known_embeddings[max_similarity_index]])[0]
        closest_label = self.encoder.inverse_transform([closest_label_enc])[0]
        max_similarity = similarities[max_similarity_index]

        return closest_label, max_similarity

    def save_models(self, model, label_encoder, class_code):
        models_dir = f'{os.curdir}/cc_models/{class_code}'
    
        if not os.path.exists(models_dir):
            os.makedirs(models_dir)

        joblib.dump(model, f'cc_models/{class_code}/{class_code}_model.pkl')
        joblib.dump(label_encoder, f'cc_models/{class_code}/{class_code}_label_encoder.pkl')
        print(f"Models saved to cc_models/{class_code}.")

    def load_models(self, class_code):
        self.model = joblib.load(f'cc_models/{class_code}/{class_code}_model.pkl')
        self.encoder = joblib.load(f'cc_models/{class_code}/{class_code}_label_encoder.pkl')
        print(f"Models loaded from cc_models/{class_code}.")
        