import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from fastapi import FastAPI, UploadFile, File, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from face_recognition_service import FaceRecognitionService

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict to certain domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize service
service = FaceRecognitionService()

# TRAIN AND TEST MODEL TOGETHER
@app.post("/create-model/{model_name}")
async def create_model(model_name: str = Path(..., description="Provide the name of the model to be created.")):
    """Create, train, and test a new model."""
    train_result = service.train()
    test_result = service.test()
    model_status = service.save_model(model_name)
    
    return {
        "create_model_status": train_result,
        "test_results": test_result,
        "save_model_status": model_status
    }

@app.get("/get-models")
async def get_models():
    """Get a list of all available models."""
    model_dir = "cc_models"
    model_identifiers = set()
    model_files = set()
    encoder_files = set()
        
    if not os.path.exists(model_dir):
        return {"message": f"Directory {model_dir} does not exist."}

    for file in os.listdir(model_dir):
        if file.endswith(".pkl"):
            if "_model.pkl" in file:
                model_files.add(file.replace("_model.pkl", ""))
            elif "_label_encoder.pkl" in file:
                encoder_files.add(file.replace("_label_encoder.pkl", ""))

    model_identifiers = model_files.intersection(encoder_files)

    if model_identifiers:
        return {"models": list(model_identifiers)}
    else:
        return {"message": "No complete models (with both model and encoder) found in the specified directory."}

@app.delete("/delete-model")
async def delete_model(model_name: str):
    """Delete the specified model."""
    model_path = os.path.join(os.getcwd(), f"cc_models/{model_name}_model.pkl")
    encoder_path = os.path.join(os.getcwd(), f"cc_models/{model_name}_label_encoder.pkl")

    if os.path.exists(model_path) and os.path.exists(encoder_path):
        os.remove(model_path)
        os.remove(encoder_path)
        return {"status": "Model deleted"}
    else:
        return {"error": "Model not found"}
    
@app.post("/set-active-model/")
async def set_active_model(model_name: str):
    """Load a specific model and set it as the active model."""
    load_status = service.load_model(model_name)
    
    # Check the "message" field in the load_status dictionary
    if "loaded successfully" in load_status.get("message", ""):
        return {"status": load_status}
    else:
        raise HTTPException(status_code=404, detail=load_status)

@app.post("/check-attendance")
async def check_attendance(group_photo: UploadFile = File(...)):
    """Validate the model on a group photo by predicting faces."""
    current_directory = os.getcwd()
    group_photo_path = os.path.join(current_directory, f"cc_pictures/class_picture", group_photo.filename)

    # Save the uploaded photo
    with open(group_photo_path, "wb") as f:
        f.write(await group_photo.read())

    result = service.validate(group_photo.filename)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)