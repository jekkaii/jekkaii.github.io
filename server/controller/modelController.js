import axios from 'axios';

// Set the base URL for the FastAPI server
const BASE_URL = 'http://0.0.0.0:8888'; // Adjust the host and port accordingly

export const createModel = async (req, res) => {
    const { modelName } = req.params; 
    console.log(`Creating model: ${modelName}`);
    try {
        const response = await axios.post(`${BASE_URL}/create-model/${modelName}`);
        const { model_name, create_model_status, total_test_samples, correct_predictions, accuracy, save_model_status } = response.data;

        return res.status(200).json({
            success: true,
            modelName: model_name,
            createModelStatus: create_model_status,
            totalTestSamples: total_test_samples,
            correctPredictions: correct_predictions,
            accuracy: accuracy,
            saveModelStatus: save_model_status
        });
    } catch (error) {
        console.error('Error creating model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getModels = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-models`);
        return res.status(200).json({ success: true, models: response.data.models });
    } catch (error) {
        console.error('Error getting models:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteModel = async (req, res) => {
    const { modelName } = req.params; 
    try {
        const response = await axios.delete(`${BASE_URL}/delete-model/${modelName}`, {
            data: { model_name: modelName } 
        });
        return res.status(200).json({ success: true, status: response.data.status });
    } catch (error) {
        console.error('Error deleting model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const setActiveModel = async (req, res) => {
    const { modelName } = req.params; // Get modelName from the request body
    try {
        const response = await axios.post(`${BASE_URL}/set-active-model/${modelName}`, { model_name: modelName });
        return res.status(200).json({ success: true, status: response.data.status });
    } catch (error) {
        console.error('Error setting active model:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
