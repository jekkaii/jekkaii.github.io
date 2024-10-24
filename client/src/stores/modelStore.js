import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/admin"; 

axios.defaults.withCredentials = true; 

export const useFaceRecognitionModelStore = create((set) => ({
  models: [],          
  activeModel: null,   
  error: null,         
  isLoading: false,    

  // Fetch all models from the server
  getModels: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/get-models`);
      if (response.status === 200) {
        const { models } = response.data;
        set({ models, isLoading: false, error: null });
      } else {
        throw new Error("Failed to fetch models");
      }
    } catch (error) {
      set({ error: error.response?.data || error.message, isLoading: false });
    }
  },

  // Create a new model with the specified model name
  createModel: async (modelData) => { // Accept the whole model object
    set({ isLoading: true });
    try {
        const response = await axios.post(`${API_URL}/create-model`, modelData); // Send modelData as the request body
        if (response.status === 200) {
            const { newModel } = response.data; // Assuming the API returns the created model
            set((state) => ({
                models: [...state.models, newModel],
                isLoading: false,
                error: null,
            }));
        }
    } catch (error) {
        set({ error: error.message, isLoading: false });
    }
},

  // Delete a model by its name
  deleteModel: async (modelName) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`${API_URL}/delete-model/${modelName}`);
      if (response.status === 200) {
        set((state) => ({
          models: state.models.filter((model) => model.name !== modelName),
          isLoading: false,
          error: null,
        }));
        alert(response.data.message);  
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Set a model as active by its name
  setActiveModel: async (modelName) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/set-active-model/${modelName}`);
      if (response.status === 200) {
        set({ activeModel: modelName, isLoading: false, error: null });
        console.log(response);
        alert(response.data.status.message);  
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
