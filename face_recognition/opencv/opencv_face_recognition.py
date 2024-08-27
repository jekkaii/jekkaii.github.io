import cv2
import cv2.face
import numpy as np
import os

classifier_path = 'face_recognition/haarcascade_frontalface_default.xml'

# Trains a face recognition model using the Local Binary Patterns Histograms (LBPH) algorithm.
def train_faces(folder_path):
    students = []
    for i in os.listdir(folder_path):
        students.append(i)

    haar_cascade = cv2.CascadeClassifier(classifier_path)

    features = []
    labels = []

    for student in students:
        path = os.path.join(folder_path, student)
        label = students.index(student)

        for img in os.listdir(path):
            img_path = os.path.join(path, img)

            img_array = cv2.imread(img_path)
            gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)

            resized_image = cv2.resize(gray, (96, 96))

            faces_rect = haar_cascade.detectMultiScale(resized_image, scaleFactor=1.1, minNeighbors=4)

            for (x,y,w,h) in faces_rect:
                faces_roi = gray[y:y+h, x:x+w]
                features.append(faces_roi)
                labels.append(label)

    features = np.array(features, dtype='object')
    labels = np.array(labels)

    face_recognizer = cv2.face.LBPHFaceRecognizer_create()

    face_recognizer.train(features,labels)

    face_recognizer.save('trained_faces.yml')

# Recognizes and annotates faces in an image using a trained LBPH face recognizer and Haar Cascade Classifier.
def recognize_faces(img_path, studentNames):
    students = []
    for student in studentNames:
        students.append(student)

    haar_cascade = cv2.CascadeClassifier(classifier_path)
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.read('face_recognition/trained_faces.yml')

    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)
    predictions = []

    for (x, y, w, h) in faces_rect:
        faces_roi = gray[y:y + h, x:x + w]

        label, confidence = face_recognizer.predict(faces_roi) 
        predicted_label = students[label]
        predictions.append(predicted_label)

        if (confidence > 60) & (confidence < 100):
            cv2.putText(img, str(predicted_label), (x, y - 10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 0), 1)
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        else: 
            cv2.putText(img, 'Unknown', (x, y - 10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 255), 1)
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
            
        cv2.imshow('Detected Face', img)
    cv2.waitKey(0)        
    
    return predictions