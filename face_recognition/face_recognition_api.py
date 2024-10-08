import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from fastapi import FastAPI, UploadFile, File
from face_recognition_service import FaceRecognitionService

app = FastAPI()

# Initialize service
service = FaceRecognitionService()

@app.post("/train")
async def train_model(class_code: str):
    current_directory = os.getcwd()
    train_directory = os.path.join(current_directory, f"cc_pictures/{class_code}/train")
    result = service.train(train_directory, class_code)

    return result

@app.post("/test")
async def test_model(class_code: str):
    current_directory = os.getcwd()
    test_directory = os.path.join(current_directory, f"cc_pictures/{class_code}/test")
    result = service.test(test_directory=test_directory)

    return result

@app.post("/validate")
async def validate_group_photo(class_code: str, group_photo: UploadFile = File(...) ):
    current_directory = os.getcwd()
    group_photo_path = os.path.join(current_directory, f"cc_pictures/{class_code}/val", group_photo.filename)
    result = service.validate(group_photo_path, class_code)
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)