import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBooks = () => {
    const [url, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            url,
            title,
            author,
            language,
            price,
            desc : description,
        };
        const token = localStorage.getItem("token");
        const headers = {
            authorization: `Bearer ${token}`,
            id: localStorage.getItem("id"),
        };

        try {
            const response = await axios.post('http://localhost:4000/api/bookstore/add-book', bookData, { headers });
            console.log('Book added successfully:', response.data);
            setImageUrl('');
            setTitle('');
            setAuthor('');
            setLanguage('');
            setPrice('');
            setDescription('');
            navigate('/all-books');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="p-8 bg-zinc-800 text-white rounded-lg max-w-4xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-6">Add Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex-1">
                        <label className="block mb-2">Image URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full p-2 bg-zinc-900 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex-1">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 bg-zinc-900 rounded-md"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-2 bg-zinc-900 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="flex-1">
                        <label className="block mb-2">Language</label>
                        <input
                            type="text"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-2 bg-zinc-900 rounded-md"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Price</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 bg-zinc-900 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-zinc-900 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full p-2 bg-blue-600 rounded-md hover:bg-blue-700">Add Book</button>
                </div>
            </form>
        </div>
    );
};

export default AddBooks;
