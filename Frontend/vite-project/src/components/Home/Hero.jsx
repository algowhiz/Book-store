import React from 'react'
import Home from '../../pages/Home'
import RecentAdded from './RecentAdded'
const Hero = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
        <Home />
        <RecentAdded />
    </div>
  )
}

export default Hero