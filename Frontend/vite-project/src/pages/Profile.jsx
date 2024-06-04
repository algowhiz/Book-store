import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const sendHeaders = {
    id,
    authorization: `Bearer ${token}`, // Assuming Bearer token format
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/bookstore/get-user-info", {
          headers: sendHeaders
        });
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error fetching the profile data", error.response.status, error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error fetching the profile data. No response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error fetching the profile data:", error.message);
        }
      }
    };
    fetchProfile();
  }, [id, token]);

  return (
    <div className='bg-zinc-900 md:px-12 h-screen px-2 flex md:flex-row flex-col w-full py-8 gap-4 text-white overflow-y-auto  '>
  {profile &&
    <>
      <div className='w-full md:w-1/6 md:h-full h-auto'>
        <Sidebar data={profile} />
      </div>
      <div className='w-full md:w-5/6'>
        <Outlet />
      </div>
    </>
  }
</div>

  );
}

export default Profile;
