import React from 'react';
import './styles.css';

const AlertModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="alert-modal">
            <div className="modal-content">
                <div className="modal-text">Are you sure you want to delete this task?</div>
                <div className="modal-buttons">
                    <button className="delete-button" onClick={onConfirm}>
                        Delete
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;