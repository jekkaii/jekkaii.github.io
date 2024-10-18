import axios from 'axios';
import { FaceRecognitionModel } from '../model/FaceRecognitionModel.js';

// Set the base URL for the FastAPI server
const BASE_URL = 'http://0.0.0.0:8888'; // Adjust the host and port accordingly
const model_encoder_filepath = 'cc_models/'

export const createModel = async (req, res) => {
    const { modelName } = req.params;

    try {
        const existingModel = await FaceRecognitionModel.findOne({ model_name: modelName });

        if (existingModel) {
            return res.status(400).json({
                success: false,
                message: `A model with the name '${modelName}' already exists. Please choose a different name.`
            });
        }

        const otherModels = await FaceRecognitionModel.find({});
        if (otherModels.length > 0) {
            await FaceRecognitionModel.updateMany({}, { status: "inactive" });
        }

        const response = await axios.post(`${BASE_URL}/create-model/${modelName}`);
        console.log('FastAPI Response:', response.data); 

        const { model_name, create_model_status, total_test_samples, correct_predictions, accuracy, save_model_status } = response.data;

        if (create_model_status && save_model_status.message.includes("successfully")) {
            const newModel = new FaceRecognitionModel({
                model_name: model_name,
                accuracy: accuracy,
                status: "active", 
            });

            const savedModel = await newModel.save();

            return res.status(200).json({
                success: true,
                message: "Model created and saved in the database successfully",
                modelDetails: savedModel
            });
        } else {
            throw new Error("Model creation or saving failed.");
        }

    } catch (error) {
        console.error('Error creating model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getModels = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-models`);
        const apiModels = response.data.models || []; 
        const dbModels = await FaceRecognitionModel.find({});

        const apiModelNames = new Set(apiModels.map(model => model.modelName)); 
        const dbModelNames = new Set(dbModels.map(model => model.modelName)); 

        const commonModelNames = [...apiModelNames].filter(name => dbModelNames.has(name));

        if (commonModelNames.length === 0) {
            return res.status(200).json({ success: true, models: [] });
        }

        const combinedModels = [
            ...apiModels.filter(model => commonModelNames.includes(model.modelName)),
            ...dbModels.filter(model => commonModelNames.includes(model.modelName))
        ];

        return res.status(200).json({ success: true, models: combinedModels });
    } catch (error) {
        console.error('Error getting models:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.response.data });
    }
};

export const deleteModel = async (req, res) => {
    const { modelName } = req.params; 

    try {
        const existingModel = await FaceRecognitionModel.findOne({ model_name: modelName });
        if (!existingModel) {
            return res.status(404).json({
                success: false,
                message: `Model '${modelName}' not found in the database.`
            });
        }

        const response = await axios.delete(`${BASE_URL}/delete-model/${modelName}`, {
            data: { model_name: modelName }
        });

        if (response.data.status === 'success') {
            await FaceRecognitionModel.deleteOne({ model_name: modelName });

            return res.status(200).json({
                success: true,
                message: `Model '${modelName}' deleted successfully from FastAPI and database.`,
                status: response.data.status
            });
        } else {
            return res.status(500).json({
                success: false,
                message: `Failed to delete model '${modelName}' from FastAPI service.`,
            });
        }
    } catch (error) {
        console.error('Error deleting model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const setActiveModel = async (req, res) => {
    const { modelName } = req.params; 
    try {
        const existingModel = await FaceRecognitionModel.findOne({ model_name: modelName });
        if (!existingModel) {
            return res.status(404).json({
                success: false,
                message: `Model '${modelName}' not found.`
            });
        }

        const response = await axios.post(`${BASE_URL}/set-active-model/${modelName}`, { model_name: modelName });
        
        await FaceRecognitionModel.updateMany({}, { status: "inactive" }); 
        existingModel.status = "active"; 
        await existingModel.save(); 

        return res.status(200).json({ success: true, status: response.data.status });
    } catch (error) {
        console.error('Error setting active model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};