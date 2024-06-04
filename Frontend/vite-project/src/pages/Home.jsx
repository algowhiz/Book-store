import React from 'react'
import logo from '../../public/logo.png'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const handelNav = () =>{
    navigate('/all-books');
  }

  return (
    <div className='bg-zinc-900 text-white h-[85vh] flex flex-col md:flex-row p-4 items-center justify-center'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 animate-fade-in-up'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-xl text-yellow-300 animate-fade-in-up'>
          Uncover captivating stories, enriching knowledge and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 rounded-xl px-8 py-3 hover:bg-zinc-800 animate-bounce-in' onClick={handelNav} >
            Discover Books
          </button>
        </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center mt-12 md:mt-0'>
        <img src={logo} alt="Logo" className='w-[60%] md:w-[52%] animate-zoom-in  ' />
      </div>
    </div>
  )
}

export default Home
