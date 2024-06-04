// AdminActions.jsx
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';
const AdminActions = ({ bookId }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            authorization: `Bearer ${token}`,
            id: localStorage.getItem("id"),
            bookid: bookId,
        };

        try {
            const response = await axios.delete(`https://book-store-12.onrender.com/api/bookstore/delete-book`, { headers });
            console.log('Book deleted successfully:', response.data);
            setShowModal(false); 
            navigate('/all-books'); 
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };


    return (
        <div className='flex flex-row sm:flex-col md:flex-col mt-4 lg:mt-0 lg:ml-4 gap-3'>
            <button
                className='bg-white rounded-full text-2xl p-3 transition duration-300 cursor-pointer'
                onClick={() => navigate(`/edit-book/${bookId}`)}
            >
                <FaEdit className='hover:text-green-600'/>
            </button>
            <button
                className='bg-white rounded-full text-2xl p-3 hover:text-red-700 hover:bg-gray-200 transition duration-300'
            >
                <MdDelete onClick={() => setShowModal(true)} />
                <Modal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
            </button>
        </div>
    );
};

export default AdminActions;
