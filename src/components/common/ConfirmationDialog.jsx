/* eslint-disable react/prop-types */
// ConfirmationDialog.js
import React from 'react';
import '../../styles/ConfirmationDialog.css'; // Custom CSS for styling

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <h3>Confirm Action</h3>
                <p>{message}</p>
                <div className="confirmation-dialog-actions">
                    <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
                    <button className="btn btn-secondary" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;