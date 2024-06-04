// AllOrders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderStatus } from '../store/orderStatus';
import { FaExternalLinkAlt } from "react-icons/fa";
import UserModal from '../components/Utils/Usermodal';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.orderStatus.status);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:4000/api/bookstore/get-all-order', {
          headers: { authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:4000/api/bookstore/update-status/${orderId}`, { status }, {
        headers: { authorization: `Bearer ${token}` },
      });

      console.log('Response from update status:', response.data);

      dispatch(setOrderStatus({ status, orderId }));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModal(true);
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-zinc-800 text-white rounded-lg max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Order ID</th>
              <th className="border-b py-2 px-4">User</th>
              <th className="border-b py-2 px-4">Book</th>
              <th className="border-b py-2 px-4">Actions</th>
              <th className="border-b py-2 px-4">User Info</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border-b py-2 px-4">{order._id}</td>
                <td className="border-b py-2 px-4">{order.user.username}</td>
                <td className="border-b py-2 px-4">{order.book ? order.book.title : 'N/A'}</td>
                <td className="border-b py-2 px-4">
                  <select
                    className="px-4 cursor-pointer py-1 bg-zinc-800 border rounded"
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" className='hidden' disabled>{order.status ? order.status : "Select"}</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border-b py-2 px-4">
                  <FaExternalLinkAlt
                    className='cursor-pointer'
                    onClick={() => handleUserClick(order.user)}
                    size={14}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <UserModal
            modal={modal}
            userInfo={selectedUser}
            onClose={() => setModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AllOrders;
