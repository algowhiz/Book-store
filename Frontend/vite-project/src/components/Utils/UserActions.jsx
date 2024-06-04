// UserActions.jsx
import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const UserActions = ({ heartColor, cartColor, handleFavoriteToggle, handleCartToggle }) => {
    return (
        <div className='flex flex-row sm:flex-col md:flex-col mt-4 lg:mt-0 lg:ml-4 gap-3'>
            <button
                className='bg-white rounded-full text-2xl p-3 transition duration-300 cursor-pointer'
                onClick={handleFavoriteToggle}
            >
                <FaHeart className={`${heartColor ? 'text-red-700' : 'text-black'}`} />
            </button>
            <button
                className='bg-white rounded-full text-2xl p-3 hover:text-blue-700 hover:bg-gray-200 transition duration-300'
                onClick={handleCartToggle}
            >
                <FaShoppingCart className={`${cartColor ? "text-blue-700" : "text-black"}`} />
            </button>
        </div>
    );
};

export default UserActions;
