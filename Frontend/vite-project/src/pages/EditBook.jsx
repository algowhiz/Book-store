// EditBook.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [url, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://book-store-12.onrender.com/api/bookstore/get-book-by-id/${bookId}`);
                const book = response.data.data;
                console.log(response.data.data);
                setImageUrl(book.url || '');
                setTitle(book.title || '');
                setAuthor(book.author || '');
                setLanguage(book.language || '');
                setPrice(book.price || '');
                setDescription(book.desc || '');
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            url,
            title,
            author,
            language,
            price,
            desc: description,
        };
        const token = localStorage.getItem("token");
        const headers = {
            authorization: `Bearer ${token}`,
            id: localStorage.getItem("id"),
            bookid : bookId,
        };

        try {
            const response = await axios.put(`https://book-store-12.onrender.com/api/bookstore/update-book`, bookData, { headers });
            console.log('Book updated successfully:', response.data);
            navigate(`/view-book-details/${bookId}`)
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className='bg-zinc-800 p-6'>
            <div className="p-8 bg-zinc-900 text-white rounded-lg max-w-4xl mx-auto ">
                <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2">Image URL</label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full p-2 bg-zinc-800 rounded-md"
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
                                className="w-full p-2 bg-zinc-800 rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full p-2 bg-zinc-800 rounded-md"
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
                                className="w-full p-2 bg-zinc-800 rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 bg-zinc-800 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-zinc-800 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full p-2 bg-blue-600 rounded-md hover:bg-blue-700">Update Book</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook;
