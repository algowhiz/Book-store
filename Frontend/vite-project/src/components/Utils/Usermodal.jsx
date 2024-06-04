// Modal.jsx
import React from 'react';

const UserModal = ({ modal, onClose ,userInfo}) => {
    if (!modal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
            <div className="bg-zinc-900 rounded-lg p-8  w-[400px]">
                <h2 className="text-xl mb-4 flex items-center justify-center">User : {userInfo.username}</h2>
                <p className="mb-8">Email : {userInfo.email}</p>
                <p className="mb-8">Address : {userInfo.address}</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
                        onClick={onClose}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
