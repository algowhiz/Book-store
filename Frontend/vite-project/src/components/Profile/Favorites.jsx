import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../Bookcard/BookCard';

const Favorites = () => {
  const [favBooks, setFavBooks] = useState([]); // Initialize as an empty array
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetchFavBooks = async () => {
      try {
        const id = localStorage.getItem("id"); // Fetch id from localStorage
        const response = await axios.get('http://localhost:4000/api/bookstore/get-fav-books', { headers });
        if (response.data && response.data.data) {
          setFavBooks(response.data.data); // Ensure correct data extraction
          console.log(response.data.data); // Log the fetched books
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching favorite books', error);
      }
    };
  
    fetchFavBooks();
  }, [token]); // Only token is needed as a dependency
  

  const getGridCols = () => {
    if (favBooks.length === 1) return 'grid-cols-2 p-4';
    if (favBooks.length === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div className={`grid gap-5 ${getGridCols()}`}>
      {favBooks.length > 0 ? (
        favBooks.map((book, idx) => (
          <div key={idx}>
            <BookCard it={book} fav={true} />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center font-bold">
          <p className='text-4xl'>No favourite books found.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
