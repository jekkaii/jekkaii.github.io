import cv2 as cv
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from keras_facenet import FaceNet
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from mtcnn.mtcnn import MTCNN

"""
Note: For now, this is for training and validating the images that was sent by the student/s.

To be added:    Extract Multiple Faces in a Group Photo
                (?)
"""

"""
This class is intended to load and process images of faces from a specified directory. 
It utilizes the MTCNN model for face detection and OpenCV for image processing. 
Faces are extracted from the images, resized to a default size of 160x160, 
and stored together with their corresponding class labels. 
The class also features a method to display the loaded faces.
"""
class FaceLoading:
    def __init__(self, directory):
        self.directory = directory
        self.target_size = (160,160)
        self.X = []
        self.Y = []
        self.detector = MTCNN()

    def extract_face(self, filename):
        img = cv.imread(filename)
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        x,y,w,h = self.detector.detect_faces(img)[0]['box']
        x,y = abs(x), abs(y)
        face = img[y:y+h, x:x+w]
        face_arr = cv.resize(face, self.target_size)
        return face_arr

    def load_faces(self, dir):
        FACES = []
        for im_name in os.listdir(dir):
            try:
                path = dir + im_name
                single_face = self.extract_face(path)
                FACES.append(single_face)
            except Exception as e:
                print(e)
        return FACES

    def load_classes(self):
        print(self.directory)
        for sub_dir in os.listdir(self.directory):
            print(sub_dir)
            path = self.directory + '/' + sub_dir + '/'
            FACES = self.load_faces(path)
            labels = [sub_dir for _ in range(len(FACES))]
            print(f"Loaded successfully: {len(labels)}")
            self.X.extend(FACES)
            self.Y.extend(labels)
        return np.asarray(self.X), np.asarray(self.Y)

    def plot_images(self):
        plt.figure(figsize=(18,16))
        for num, image in enumerate(self.X):
            ncols = 3
            nrows = len(self.Y)//ncols + 1
            plt.subplot(nrows,ncols,num + 1)
            plt.imshow(image)
            plt.axis('off')

class FaceRecognitionModel:
    def __init__(self):
        self.facenet = FaceNet()  
        self.encoder = LabelEncoder()
        self.model = None

    def embed_faces(self, faces):
        return self.facenet.embeddings(faces)

    def train_model(self, X_train, y_train):
        y_train_enc = self.encoder.fit_transform(y_train)
        self.model = SVC(kernel='linear', probability=True)
        self.model.fit(X_train, y_train_enc)

    def predict(self, X_test):
        y_pred_enc = self.model.predict(X_test)
        return self.encoder.inverse_transform(y_pred_enc)

    def evaluate_model(self, X_test, y_test):
        y_pred = self.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)

        for actual, predicted in zip(y_test, y_pred):
            print(f"Actual: {actual}, Predicted: {predicted}")

        return accuracy


if __name__ == "__main__":
    face_loader = FaceLoading(directory='../dataset') # <---- SEND PICS HAHAHA
    X, Y = face_loader.load_classes()

    face_recognition_model = FaceRecognitionModel()
    X_embeddings = face_recognition_model.embed_faces(X)

    X_train, X_test, y_train, y_test = train_test_split(X_embeddings, Y, test_size=0.2, random_state=42)

    face_recognition_model.train_model(X_train, y_train)
    accuracy = face_recognition_model.evaluate_model(X_test, y_test)

    print(f"Model accuracy: {accuracy}")