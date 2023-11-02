import React from 'react'
import useFetch from '../../hooks/useFetch'
import Cookies from 'js-cookie';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

const Profile = () => {
    const customer_id = Cookies.get("customer_id");
    const {data} = useFetch(`http://localhost:3500/customer/${customer_id}`)

    if (!data || data.length === 0) {
        return <div>Loading...</div>; // Add loading indicator
      }
    
      const customer = data[0];
    
      return (
        <div>
          <Header />
          <div className="flex justify-center mb-10 items-center flex-col font-Rubik text-zinc-900">
        <h1 className="text-zinc-900 text-3xl mb-10">Profile Information</h1>
        <div className="card w-96 bg-white bg-opacity-80 shadow-xl flex flex-col gap-4 px-5 py-5">
              <div className="flex gap-1">
                <p>ID:</p>
                <p>{customer.customer_id}</p>
              </div>
              <div className="flex gap-1">
                <p>Name:</p>
                <p>{customer.name}</p>
              </div>
              <div className="flex gap-1">
                <p>Username:</p>
                <p>{customer.username}</p>
              </div>
              <div className="flex gap-1">
                <p>Password:</p>
                <p>{customer.password}</p>
              </div>
              <div className="flex gap-1">
                <p>Faculty:</p>
                <p>{customer.faculty}</p>
              </div>
              <div className="flex gap-1">
                <p>Email:</p>
                <p>{customer.email}</p>
              </div>
            </div>
            <Link to="/welcome/change-profile">
                <button className='flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]'>Manage Profile</button>
              </Link>
          </div>
        </div>
      );
}

export default Profile