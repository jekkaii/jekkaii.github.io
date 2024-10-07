import React, { useState } from 'react';
import "../css/style.css"; // Ensure your CSS path is correct

const ManageModel = () => {
    const [models, setModels] = useState([
        { id: 1, name: 'Sample Model', mode: 'Draft', state: 'Inactive', isTemplate: false, error: false },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modelUrl, setModelUrl] = useState('');

    const handleDeployModel = (id) => {
        setModels(models.map(model => model.id === id ? { ...model, state: 'Active' } : model));
    };

    const handleUndeployModel = (id) => {
        setModels(models.map(model => model.id === id ? { ...model, state: 'Inactive' } : model));
    };

    const handleRemoveModel = (id) => {
        setModels(models.filter(model => model.id !== id));
    };

    const handleExportModel = (id) => {
        const modelToExport = models.find(model => model.id === id);
        const blob = new Blob([JSON.stringify(modelToExport)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${modelToExport.name}.json`;
        link.click();
    };

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
                                <h3>{model.name}</h3>
                                <div>
                                    <span>{model.mode}</span> - <span>{model.state}</span>
                                    {model.error && <span className="error-icon">Runtime Error</span>}
                                </div>
                            </div>
                            <div className="model-actions">
                                <button onClick={() => handleDeployModel(model.id)}>Deploy</button>
                                <button onClick={() => handleUndeployModel(model.id)}>Deactivate</button>
                                <button onClick={() => handleRemoveModel(model.id)}>Delete</button>
                                <button onClick={() => handleExportModel(model.id)}>Export</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageModel;
