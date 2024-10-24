import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1' 
from fastapi import FastAPI, UploadFile, File, HTTPException, Path
from fastapi.responses import JSONResponse
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

@app.post("/create-model/{model_name}")
async def create_model(model_name: str = Path(..., description="Provide the name of the model to be created.")):
    """Create, train, and test a new model."""
    try:
        create_model_status = service.train()
        test_result = service.test()

        total_test_samples = test_result.get("total_test_samples")
        correct_predictions = test_result.get("correct_predictions")
        accuracy = test_result.get("accuracy (%)")

        save_model_status = service.save_model(model_name)
        
        return {
            "model_name": model_name,
            "create_model_status": create_model_status,
            "total_test_samples": total_test_samples,
            "correct_predictions": correct_predictions,
            "accuracy": accuracy,
            "save_model_status": save_model_status
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while creating the model: {str(e)}")

@app.get("/get-models")
async def get_models():
    """Get a list of all available models."""
    model_dir = "cc_models"
    model_identifiers = set()
    model_files = set()
    encoder_files = set()

    try:
        if not os.path.exists(model_dir):
            raise HTTPException(status_code=404, detail=f"Directory {model_dir} does not exist.")
        
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
            raise HTTPException(status_code=404, detail="No complete models (with both model and encoder) found.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.delete("/delete-model/{model_name}")
async def delete_model(model_name: str):
    """Delete the specified model."""
    model_path = os.path.join(os.getcwd(), f"cc_models/{model_name}_model.pkl")
    encoder_path = os.path.join(os.getcwd(), f"cc_models/{model_name}_label_encoder.pkl")

    try:
        if os.path.exists(model_path) and os.path.exists(encoder_path):
            os.remove(model_path)
            os.remove(encoder_path)
            return {"status": "Model deleted"}
        else:
            raise HTTPException(status_code=404, detail="Model or encoder not found.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting the model: {str(e)}")

@app.post("/set-active-model/{model_name}")
async def set_active_model(model_name: str):
    """Load a specific model and set it as the active model."""
    load_status = service.load_model(model_name)

    if "loaded successfully" in load_status.get("message", ""):
        return {"status": load_status}
    else:
        error_message = load_status.get("message", "Model not found.")
        error_code = load_status.get("code", 404)  
        
        raise HTTPException(status_code=error_code, detail=f"Failed to load model '{model_name}': {error_message}")


@app.post("/check-attendance/")
async def check_attendance(group_photo: UploadFile):
    """Validate the model on a group photo by predicting faces."""
    try:
        if group_photo.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(status_code=400, detail="Unsupported file type. Only JPEG or PNG images are allowed.")

        current_directory = os.getcwd()
        group_photo_path = os.path.join(current_directory, "cc_pictures/class_picture", group_photo.filename)

        with open(group_photo_path, "wb") as f:
            f.write(await group_photo.read())

        result = service.validate(group_photo.filename)

        if isinstance(result, dict) and result.get("error"):
            return {"error": result.get("error")}

        return result

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File or directory not found.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the group photo: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)