import React from 'react';
import './styles.css';

function TaskCard({title, description, due_date, status, onDelete, onEdit}) {
    const handleDelete = () => {
        onDelete();
    };

    const handleEdit = () => {
        onEdit();
    };

    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div className="title-container">
                    <div className="title">{title}</div>
                    <div className="btns-wrapper">
                        <button className="edit-button" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="status-switch-wrapper">
                    <div className="status">Status: {status}</div>
                </div>
                <div className="description">{description}</div>
                <div className="due-date">Due Date: {due_date}</div>
            </div>
        </div>
    );
}

export default TaskCard;
