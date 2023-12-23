import React, {useState} from 'react';
import './styles.css';
import AlertModal from "../AlertModal";

const TaskCard = ({ title, description, due_date, status, onDelete, onEdit}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem("usertype"));


    const handleEdit = () => {
        onEdit();
    };
    const handleDelete = () => {
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setIsAlertOpen(false);
    };

    const handleCancelDelete = () => {
        setIsAlertOpen(false);
    };

    return (
        <div className="card-container">
            <div className="card-wrapper">
                <div className="title-container">
                    <div className="title">{title}</div>
                    {userType === "1" && (
                        <div className="btns-wrapper">
                            <button className="edit-button" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="status-switch-wrapper">
                    <div className="status">Status: {status}</div>
                </div>
                <div className="description">{description}</div>
                <div className="due-date">Due Date: {due_date}</div>
            </div>
            {isAlertOpen && (
                <AlertModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            )}
        </div>
    );
};

export default TaskCard;
