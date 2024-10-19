const API_URL = 'http://localhost:3001/auth/admin'; // Replace with your API URL

export const fetchModels = async () => {
    try {
        const response = await fetch(`${API_URL}/get-models`);
        console.log("Model");
        if (!response.ok) throw new Error('Failed to fetch models');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const removeModel = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Failed to delete model:', error);
    }
};

export const updateModelStatus = async (id, status) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
    } catch (error) {
        console.error('Failed to update model status:', error);
    }
};

export const renameModel = async (id, newName) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model_name: newName }),
        });
    } catch (error) {
        console.error('Failed to rename model:', error);
    }
};
