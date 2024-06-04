import React, { useState } from 'react';
import { BiSolidBookBookmark } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authAction } from '../../store/auth';

const Nav = () => {

    const dispatch = useDispatch();

    const [mobileView, setMobileView] = useState(false);
    const navItems = [
        {
            title: "Home",
            link: '/',
        },
        {
            title: "All Books",
            link: '/all-books',
        },
        {
            title: "Cart",
            link: '/cart',
        },
        {
            title: "Profile",
            link: '/profile',
        },
        {
            title: "Admin Profile",
            link: '/profile',
        },
    ];

    const handleMobileView = () => {
        setMobileView(!mobileView);
    }

    const handelLogout = () => {
        dispatch(authAction.logout());
    }

    const isLogedIn = useSelector((it) => it.auth.isLoggedIn);
    const role = useSelector((it) => it.auth.role);

    if (isLogedIn == false)
        navItems.splice(2, 3);

    if(isLogedIn == true && role == 'user'){
        navItems.splice(4, 1);

    }

    if(isLogedIn == true && role == 'admin'){
        navItems.splice(2, 2);

    }

    return (
        <>
            <div className='bg-zinc-800 text-white px-5 py-3 flex justify-between items-center nav z-10'>
                <div className='flex items-center gap-2'>
                    <BiSolidBookBookmark size={25} />
                    <h1 className='text-2xl font-semibold'>Cozy Reads</h1>
                </div>
                <div className='hidden md:flex gap-3 nav-link items-center'>
                    <div className='flex gap-10 mr-2'>
                        {
                            navItems.map((it, idx) => (
                                <Link to={it.link} className='hover:text-blue-500 cursor-pointer transition-all duration-300' key={idx}>
                                    {it.title}
                                </Link>
                            ))
                        }
                    </div>
                    <div className='flex gap-3'>
                        {

                            isLogedIn ? <Link to="/login" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handelLogout}>
                                Logout
                            </Link> : <><Link to="/login" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handleMobileView}>
                                Login
                            </Link>
                                <Link to="/sign-up" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handleMobileView}>
                                    Sign-Up
                                </Link></>

                        }
                    </div>
                </div>
                {!mobileView ? <FaGripLines className='md:hidden z-40' size={25} onClick={handleMobileView} /> : <RxCross1 className='md:hidden z-40' size={25} onClick={handleMobileView} />}
            </div>
            {mobileView && (
                <div className='bg-zinc-800 h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-14 md:hidden'>
                    {
                        navItems.map((it, idx) => (
                            <Link smooth={true} duration={600} offset={-70} onClick={handleMobileView} to={it.link} className='hover:text-blue-500 cursor-pointer transition-all duration-300 text-white text-2xl z-50' key={idx}>
                                {it.title}
                            </Link>
                        ))
                    }
                    <div className='flex gap-3'>
                        {

                            isLogedIn ? <Link to="/login" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handelLogout}>
                                Logout
                            </Link> : <><Link to="/login" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handleMobileView}>
                                Login
                            </Link>
                                <Link to="/sign-up" className='px-4 py-2 border-2  border-[#296073] text-white cursor-pointer hover:bg-white hover:text-black font-bold  transition-all duration-300 rounded-lg' onClick={handleMobileView}>
                                    Sign-Up
                                </Link></>

                        }
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;
