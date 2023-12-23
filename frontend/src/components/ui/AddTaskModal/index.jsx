import React, { useState, useEffect } from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg';

const AddTaskModal = ({ onClose, onSubmit, isEdit, taskToEdit }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        due_date: '',
    });

    useEffect(() => {
        if (isEdit && taskToEdit) {
            setNewTask({
                title: taskToEdit.title,
                description: taskToEdit.description,
                due_date: taskToEdit.due_date,
            });
        }
    }, [isEdit, taskToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = async () => {
        onSubmit({ ...newTask });
    };

    return (
        <div className="modal-content">
            <div className="modal-request-title">
                <h2>{isEdit ? 'Edit Task' : 'Add a Task'}</h2>
                <img src={XMark} alt="Close" onClick={onClose} />
            </div>
            <div className="label-wrappers">
                <div className="task-input">
                    <label>Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="task-input">
                    <label>Description:</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="task-input">
                    <label>Due Date:</label>
                    <input
                        type="datetime-local"
                        id="due_date"
                        name="due_date"
                        value={newTask.due_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>
                    {isEdit ? 'Update' : 'Confirm'}
                </button>
            </div>
        </div>
    );
};

export default AddTaskModal;
