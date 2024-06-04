// Modal.jsx
import React from 'react';

const Modal = ({ showModal, onClose, onConfirm }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
            <div className="bg-zinc-900 rounded-lg p-8">
                <h2 className="text-xl mb-4">Confirm Deletion</h2>
                <p className="mb-8">Are you sure you want to delete this item?</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
