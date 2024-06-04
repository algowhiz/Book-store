import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from 'react-redux';

const Sidebar = ({ data }) => {
    const navigate = useNavigate();
    const role = useSelector((it) => it.auth.role);

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/login');
    }
    console.log("hi");
    console.log(data.avtar);

    if (!data) {
        return null;
    }

    return (
        <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between lg:h-full'>
            <div className='flex items-center justify-center flex-col'>
                <img src={data.avtar} alt="profile pic" className='h-24 w-24 rounded-full bg-white' />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                    {data.username}
                </p>
                <p className='mt-1 text-zinc-300 text-xs font-semibold break-words'>
                    {data.email}
                </p>
                <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
            </div>

            {
                role == 'admin' ? <><div className='w-full flex md:flex-col items-center justify-center lg:flex lg:mt-4  mt-4'>
                    <Link
                        to='/profile'
                        className='text-zinc-100 font-semibold w-full  py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        All Orders
                    </Link>
                    <Link
                        to='/profile/add-book'
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 mt-2' // Added mt-2 class here
                    >
                        Add Book
                    </Link>
                </div></> : <><div className='w-full flex md:flex-col items-center justify-center lg:flex lg:mt-4  mt-4'>
                    <Link
                        to='/profile'
                        className='text-zinc-100 font-semibold w-full  py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        Favourites
                    </Link>
                    <Link
                        to='/profile/orderHistory'
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 mt-2' // Added mt-2 class here
                    >
                        Order History
                    </Link>
                    <Link
                        to='/profile/settings'
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 mt-2' // Added mt-2 class here
                    >
                        Settings
                    </Link>
                </div></>
            }


            <button
                className='bg-zinc-800 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center p-2 rounded transition-all duration-300 hover:bg-zinc-700'
                onClick={handleLogout}
            >
                Log-Out <IoIosLogOut className='ml-2' />
            </button>
        </div>
    )
}

export default Sidebar
