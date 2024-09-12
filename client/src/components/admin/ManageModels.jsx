import React, { useState } from 'react';
import 'D:/Users/Lenovo/Desktop/Cogito-creatio-cc-face/cc-face-app/client/src/components/css/style.css';

const ManageModel = () => {
    const [activeTab, setActiveTab] = useState('models');
    const [models, setModels] = useState([
        { id: 1, name: 'Model 1', mode: 'Draft', state: 'Inactive', isTemplate: false, error: false },
        { id: 2, name: 'Model 2', mode: 'Production', state: 'Active', isTemplate: true, instances: 2, error: true },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAddModel = () => {
        const newModel = {
            id: models.length + 1,
            name: `Model ${models.length + 1}`,
            mode: 'Draft',
            state: 'Inactive',
            isTemplate: false,
            error: false,
        };
        setModels([...models, newModel]);
    };

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

    const handleImportModel = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const importedModel = JSON.parse(e.target.result);
                setModels([...models, importedModel]);
            };
            reader.readAsText(file);
        }
    };

    const filteredModels = models.filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="manage-model">
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'models' ? 'active' : ''}`}
                    onClick={() => handleTabClick('models')}
                >
                    Models
                </div>
                <div
                    className={`tab ${activeTab === 'samples' ? 'active' : ''}`}
                    onClick={() => handleTabClick('samples')}
                >
                    Samples
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'models' && (
                    <div className="models-tab">
                        <div className="toolbar">
                            <button onClick={handleAddModel}>New Model</button>
                            <label htmlFor="import-model" className="import-button">
                                Import Model
                                <input id="import-model" type="file" onChange={handleImportModel} hidden />
                            </label>
                            <input
                                type="text"
                                placeholder="Search Model Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="model-cards">
                            {filteredModels.map(model => (
                                <div key={model.id} className="model-card">
                                    <div className="model-info">
                                        <h3>{model.name}</h3>
                                        {model.isTemplate ? (
                                            <div>
                                                <span>{model.instances} Instances</span>
                                                {model.error && <span className="error-icon">!</span>}
                                            </div>
                                        ) : (
                                            <div>
                                                <span>{model.mode}</span> - <span>{model.state}</span>
                                                {model.error && <span className="error-icon">Runtime Error</span>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="model-actions">
                                        <button onClick={() => handleDeployModel(model.id)}>Deploy</button>
                                        <button onClick={() => handleUndeployModel(model.id)}>Undeploy</button>
                                        <button onClick={() => handleRemoveModel(model.id)}>Remove</button>
                                        <button onClick={() => handleExportModel(model.id)}>Export</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'samples' && (
                    <div className="samples-tab">
                        <p>List of sample models...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageModel;