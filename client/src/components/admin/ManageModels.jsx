import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Select, Form, Alert } from "antd";
import { useFaceRecognitionModelStore } from "../../stores/modelStore";
import "../css/style.css";

const { Option } = Select;

const ManageModel = () => {
    const {
        models,
        activeModel,
        isLoading,
        getModels,
        createModel,
        deleteModel,
        setActiveModel,
        error
    } = useFaceRecognitionModelStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [semester, setSemester] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Fetch models from the backend on component load
    useEffect(() => {
        getModels();
    }, [getModels]);

    const filteredModels = models.filter((model) =>
        model?.model_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleCreateModel = async () => {
        if (!schoolYear || !semester) {
            alert("Please fill in all fields");
            return;
        }
    
        // Construct the model name
        const modelName = `${schoolYear}_${semester}`; 
    
        const newModel = {
            modelName: modelName,
        };
    
        await createModel(newModel);
        getModels();
        closeModal();
    
        setSchoolYear('');
        setSemester('');
    };

    return (
        <div className="manage-model">
            {/* Button to open modal */}
            <Button type="primary" onClick={openModal} className='create-model-btn'>
                Create Model
            </Button>

            {/* Modal for creating a model */}
            <Modal
                title="Create Model"
                open={showModal}
                onOk={handleCreateModel}
                onCancel={closeModal}
                okText="Create"
                cancelText="Close"
            >
                <Form>
                    <Form.Item label="School Year" required>
                        <Select
                            value={schoolYear}
                            onChange={(value) => setSchoolYear(value)} 
                            placeholder="Select Year">
                            <Option value="2024-2025">2024-2025</Option>
                            <Option value="2025-2026">2025-2026</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Semester" required>
                        <Select
                            value={semester}
                            onChange={(value) => setSemester(value)} 
                            placeholder="Select Semester">
                            <Option value="1st">1st</Option>
                            <Option value="2nd">2nd</Option>
                            <Option value="Short">Short</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <div className="toolbar">
                <Input
                    placeholder="Search models"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display models or error messages */}
            <div className="model-cards">
                {!isLoading && !error && models.length === 0 && (
                    <Alert message="No models found." type="info" showIcon />
                )}

                {error && (
                    <Alert
                    message="Face Recognition Service Unavailable"
                    description="There was an issue connecting to the face recognition service."
                    type="error"
                    showIcon
                    />
                )}

                {filteredModels.map((model) => (
                    <div key={model._id} className="model-card">
                        <div className="model-info">
                            <h3>{model.model_name}</h3>
                            <div>
                                <span>Accuracy: {model.accuracy}%</span>
                            </div>
                        </div>

                        <div className="model-actions">
                            <Button 
                                onClick={() => setActiveModel(model.model_name)}
                                disabled={model.status === 'active'}
                                className='activate-btn'
                            >
                                Activate
                            </Button>
                            <Button
                                onClick={() => deleteModel(model.model_name)}
                                className="delete-btn"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && <p>Loading models...</p>}
        </div>
    );
};

export default ManageModel;
