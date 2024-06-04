import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Bookcard/BookCard';

const RecentAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('https://book-store-12.onrender.com/api/bookstore/get-recent-books');
        setData(response.data.data || []); 
      } catch (error) {
        console.error('Error fetching recent books:', error);
      }
    };

    fetch();
  }, []);

  

  return (
    <div className='text-white mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recent Added books</h4>
      <div className='my-8 grid md:grid-cols-3 gap-8 sm:grid-cols-3 grid-cols-1'>
        {data.length > 0 ? (
          data.map((it, idx) => (
            <div key={idx}>
              <BookCard it={it} />
            </div>
          ))
        ) : (
          <p>No recent books available</p>
        )}
      </div>
    </div>
  );
};

export default RecentAdded;
