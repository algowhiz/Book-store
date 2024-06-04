import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Settings = () => {

  const [val, setVal] = useState({ address: "" });
  const [profileData, setprofileData] = useState();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const sendHeaders = {
    id,
    authorization: `Bearer ${token}`,
  };

  const change = (e) =>{
    const {name,value} = e.target;
    setVal({...value,[name]:value});
  }

   const submitAddress = async () =>{
    const resp = await axios.put('http://localhost:4000/api/bookstore/update-address',val,{headers:sendHeaders});
    console.log(resp);
   }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:4000/api/bookstore/get-user-info', { headers: sendHeaders });
      setprofileData(response.data)
      setVal({ address: response.data.address });
    };
    fetch();
  }, []);


  return (
    <>
      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 font-semibold mt-2'
              name="address"
              id="address"
              placeholder='address'
              value={val.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={submitAddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'>Update</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings