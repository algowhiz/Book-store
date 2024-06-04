import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../components/Bookcard/BookCard';
import Shimmer from '../components/Utils/Shimmer';

const AllBooks = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('https://book-store-12.onrender.com/api/bookstore/get-all-books');
      setData(response.data.data);
      setLoading(false);
    }
    fetch();
    
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill().map((_, idx) => (
          <Shimmer key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className='bg-zinc-900 px-12 py-8 h-screen'>
      <div className='text-white mt-8 px-4'>
        <h4 className='text-3xl text-yellow-100'>All books</h4>
        <div className='my-8 grid md:grid-cols-3 gap-10 sm:grid-cols-3 grid-cols-1'>
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
    </div>
  )
}

export default AllBooks
