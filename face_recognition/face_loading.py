import os
import cv2 as cv
import numpy as np
from mtcnn.mtcnn import MTCNN

class FaceLoading:
    def __init__(self, directory):
        self.directory = directory
        self.target_size = (160, 160)
        self.X = []
        self.Y = []
        self.detector = MTCNN()
        self.confidence_threshold = 0.90  

    def extract_faces(self, filename, multiple=False):
        img = cv.imread(filename)
        if img is None:
            raise ValueError(f"Image not found or unable to read: {filename}")
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        faces = self.detector.detect_faces(img)
        if not faces:
            if multiple:
                return []  
            else:
                raise ValueError(f"No faces detected in the image: {filename}")

        if multiple:
            face_arrs = []
            for face in faces:
                if face['confidence'] >= self.confidence_threshold:  
                    x, y, w, h = face['box']
                    x, y = abs(x), abs(y)
                    face_img = img[y:y+h, x:x+w]
                    face_resized = cv.resize(face_img, self.target_size)
                    face_arrs.append(face_resized)
            return face_arrs
        else:
            if faces[0]['confidence'] >= self.confidence_threshold:  
                x, y, w, h = faces[0]['box']
                x, y = abs(x), abs(y)
                face = img[y:y+h, x:x+w]
                face_arr = cv.resize(face, self.target_size)
                return face_arr
            else:
                raise ValueError(f"Face confidence below threshold: {faces[0]['confidence']}")

    def load_faces(self, dir, multiple=False):
        FACES = []
        for im_name in os.listdir(dir):
            im_path = os.path.join(dir, im_name)
            if not os.path.isfile(im_path):
                continue  
            try:
                faces = self.extract_faces(im_path, multiple=multiple)
                if multiple:
                    FACES.extend(faces)
                else:
                    FACES.append(faces)
            except Exception as e:
                print(f"Error loading {im_name}: {str(e)}")
                pass
        return FACES

    def load_classes(self, multiple=False):
        print(f"Loading classes from directory: {self.directory}")
        for sub_dir in os.listdir(self.directory):
            sub_dir_path = os.path.join(self.directory, sub_dir)
            if not os.path.isdir(sub_dir_path):
                continue  
            print(f"Processing class: {sub_dir}")
            FACES = self.load_faces(sub_dir_path, multiple=multiple)
            if not FACES:
                print(f"No faces found for class: {sub_dir}")
                continue
            labels = [sub_dir for _ in range(len(FACES))]
            print(f"Loaded successfully: {len(labels)} faces for class '{sub_dir}'")
            self.X.extend(FACES)
            self.Y.extend(labels)
        
        return np.asarray(self.X), np.asarray(self.Y)