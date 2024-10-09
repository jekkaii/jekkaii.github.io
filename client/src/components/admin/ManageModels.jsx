import React, { useState } from 'react';
import "../css/style.css"; // Ensure your CSS path is correct

const ManageModel = () => {
    const [models, setModels] = useState([
        { id: 1, name: 'Sample Model 1', state: 'Inactive', isTemplate: false, error: false },
        { id: 2, name: 'Sample Model 2', state: 'Inactive', isTemplate: false, error: false },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [editingModel, setEditingModel] = useState(null);  // Model currently being renamed
    const [newName, setNewName] = useState('');

    // Handle activating a model
    const handleActivateModel = (id) => {
        setModels(models.map(model => model.id === id ? { ...model, state: 'Active' } : model));
    };

    // Handle deactivating a model
    const handleDeactivateModel = (id) => {
        setModels(models.map(model => model.id === id ? { ...model, state: 'Inactive' } : model));
    };

    // Remove model from the list
    const handleRemoveModel = (id) => {
        setModels(models.filter(model => model.id !== id));
    };

    // Rename model and update state
    const handleRenameModel = (id) => {
        setModels(models.map(model => model.id === id ? { ...model, name: newName } : model));
        setEditingModel(null); // Exit rename mode after renaming
        setNewName(''); // Clear the input field
    };

    // Check if there is any active model
    const activeModel = models.find(model => model.state === 'Active');
    
    const filteredModels = models.filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="manage-model">
            <div className="models-tab">
                <div className="toolbar">
                    <div className="url-box">
                        <label htmlFor="model-url" className="url-label">
                            Enter Model URL:
                        </label>
                        <input
                            type="url"
                            id="model-url"
                            placeholder="https://example.com/model"
                            value={modelUrl}
                            onChange={(e) => setModelUrl(e.target.value)}
                            className="url-input"
                        />
                    </div>
                </div>
                <div className="model-cards">
                    {filteredModels.map(model => (
                        <div key={model.id} className="model-card">
                            <div className="model-info">
                                {/* Conditional rendering for renaming */}
                                {editingModel === model.id ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Enter new name"
                                        className="manage-model-rename-input"
                                    />
                                ) : (
                                    <h3>{model.name}</h3>
                                )}
                                <div>
                                    <span>{model.state}</span>
                                    {model.error && <span className="error-icon">Runtime Error</span>}
                                </div>
                            </div>
                            <div className="model-actions">
                                {/* Disable Activate/Deactivate based on active model */}
                                <button
                                    onClick={() => handleActivateModel(model.id)}
                                    disabled={model.state === 'Active' || activeModel && activeModel.id !== model.id}
                                    className={model.state === 'Active' || (activeModel && activeModel.id !== model.id) ? 'manage-model-btn-disabled' : ''}
                                >
                                    Activate
                                </button>
                                <button
                                    onClick={() => handleDeactivateModel(model.id)}
                                    disabled={model.state === 'Inactive' || activeModel && activeModel.id !== model.id}
                                    className={model.state === 'Inactive' || (activeModel && activeModel.id !== model.id) ? 'manage-model-btn-disabled' : ''}
                                >
                                    Deactivate
                                </button>
                                <button onClick={() => handleRemoveModel(model.id)}>Delete</button>
                                {editingModel === model.id ? (
                                    <button onClick={() => handleRenameModel(model.id)}>Save</button>
                                ) : (
                                    <button onClick={() => setEditingModel(model.id)}>Rename</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageModel;