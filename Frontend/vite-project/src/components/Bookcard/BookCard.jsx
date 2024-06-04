import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/img.jpg'

const BookCard = ({ it ,fav}) => {

  
  
  return (
    <Link to={`/view-book-details/${it._id}`}>
      <div className='bg-zinc-800 rounded-lg p-4 flex flex-col '>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={it.url} alt={it.title} className='h-[25vh] p-2' />
        </div>
        <h2 className='mt-4 text-xl font-semibold'>{it.title}</h2>
        <p className='mt-2 text-xl text-zinc-400 font-semibold'>{it.author}</p>
        <p className='mt-2 text-xl text-zinc-200 font-semibold'>$ {it.price}</p>
      </div>
    </Link>
  );
};

export default BookCard;
