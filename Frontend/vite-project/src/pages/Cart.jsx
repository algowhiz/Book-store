import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import E_cart from '../../public/empty-cart.png'

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const sendHeaders = {
    id,
    authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:4000/api/bookstore/get-user-cart', { headers: sendHeaders });
      setCart(response.data.data);
      const id = response.data.data[0]._id;
      localStorage.setItem('del_id', id);
      calculateTotal(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      await axios.put(`http://localhost:4000/api/bookstore/remove-from-cart/${itemId}`, {}, { headers: sendHeaders });
      const updatedCart = cart.filter(item => item._id !== itemId);
      setCart(updatedCart);
      calculateTotal(updatedCart);
      localStorage.removeItem(`cart_${itemId}`);
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  };
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/bookstore/place-order',
        { order: cart },
        { headers: sendHeaders }
      );
      const id = localStorage.getItem('del_id');
      localStorage.removeItem(`cart_${id}`);
      alert(response.data.message);
      navigate('/profile/orderHistory');

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };


  return (
    <div className=" px-12 p-5 bg-zinc-900 h-screen overflow-scroll w-[100%]">
      {cart.length === 0 ? (
        <div className="h-screen ">
          <div className="h-full flex items-center justify-center flex-col">
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-100 mb-8 animate-bounce'>
              Empty Cart
            </h1>
            <img
              src={E_cart}
              alt="Empty Cart"
              className="w-1/2 h-auto max-w-sm rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className=' text-5xl font-semibold text-zinc-400 mb-6'>
            Your Cart
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
            {cart.map((it, idx) => (
              <div key={idx} className='rounded flex flex-col p-4 bg-zinc-800 shadow-lg'>
                <img src={it.url} alt="" className='h-40 object-cover rounded-md mb-4' />
                <h1 className='text-xl text-zinc-100 font-semibold'>{it.title}</h1>
                <p className='text-sm text-zinc-100 mt-2'>{it.desc.slice(0, 60)}...</p>
                <div className='flex mt-4 items-center justify-between'>
                  <h2 className='text-zinc-100 text-xl font-semibold'>${it.price}</h2>
                  <button
                    className='bg-red-500 hover:bg-red-700 flex gap-2 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out'
                    onClick={() => deleteItem(it._id)}
                  >
                    Remove <MdDeleteForever size={23} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 bg-zinc-800 w-[300px] p-4'>
            <h2 className='text-4xl text-zinc-100 font-semibold'>Total: ${total}</h2>
            <button className='bg-white text-black py-2 px-2 rounded-lg mt-5' onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
