import React, { useState, useEffect } from 'react';
import { fetchModels, removeModel, updateModelStatus, renameModel } from "../../stores/modelStore.js";
import "../css/style.css";

const ManageModel = () => {
    const [models, setModels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [editingModel, setEditingModel] = useState(null);
    const [newName, setNewName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [schoolYear, setSchoolYear] = useState('');
    const [semester, setSemester] = useState('');

    // Fetch models from the backend on component load
    useEffect(() => {
        const loadModels = async () => {
            const data = await fetchModels();
            setModels(data);
        };
        loadModels();
    }, []);

    const filteredModels = models.filter((model) =>
        model.model_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleActivateModel = async (id) => {
        await updateModelStatus(id, 'active');
        setModels(models.map((model) =>
            model._id === id ? { ...model, status: 'active' } : { ...model, status: 'inactive' }
        ));
    };

    const handleRemoveModel = async (id) => {
        await removeModel(id);
        setModels(models.filter((model) => model._id !== id));
    };

    const handleRenameModel = async (id) => {
        await renameModel(id, newName);
        setModels(models.map((model) =>
            model._id === id ? { ...model, model_name: newName } : model
        ));
        setEditingModel(null);
        setNewName('');
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="manage-model">
            <button onClick={openModal} className="create-model-btn">Create Model</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create Model</h2>
                        <label>School Year:</label>
                        <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)}>
                            <option value="">Select Year</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>

                        <label>Semester:</label>
                        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                            <option value="">Select Semester</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                        </select>

                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            <div className="toolbar">
                <input
                    type="url"
                    placeholder="Enter Model URL"
                    value={modelUrl}
                    onChange={(e) => setModelUrl(e.target.value)}
                />
            </div>

            <div className="model-cards">
                {filteredModels.map((model) => (
                    <div key={model._id} className="model-card">
                        <div className="model-info">
                            {editingModel === model._id ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter new name"
                                />
                            ) : (
                                <h3>{model.model_name}</h3>
                            )}
                            <span>{model.status}</span>
                            <span>Accuracy: {model.accuracy}%</span>
                        </div>

                        <div className="model-actions">
                            <button
                                onClick={() => handleActivateModel(model._id)}
                                disabled={model.status === 'active'}
                            >
                                Activate
                            </button>
                            <button
                                onClick={() => handleRemoveModel(model._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                            <button onClick={() => setEditingModel(model._id)}>Rename</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageModel;
