import React from 'react';
import Header from '../../components/Header';
import useFetch from '../../hooks/useFetch';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Profile = () => {
  const seller_id = Cookies.get('seller_id');
  const { data } = useFetch(`http://localhost:3500/seller/${seller_id}`);

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Add loading indicator
  }

  const seller = data[0];

  return (
    
    <div className="min-h-screen text-zinc-900 font-Rubik bg-gradient-to-r from-slate-200 to-slate-500">
      <Header />
      <div className="flex justify-center items-center flex-col font-Rubik text-zinc-900 ">
        <h1 className="text-zinc-900 text-3xl mb-10">Seller Profile</h1>
        <div className="bg-zinc-300 card w-96 shadow-xl flex flex-col gap-4 px-5 py-5">
          <div className="flex gap-1">
            <p>ID:</p>
            <p>{seller.seller_id}</p>
          </div>
          <div className="flex gap-1">
            <p>Name:</p>
            <p>{seller.seller_name}</p>
          </div>
          <div className="flex gap-1">
            <p>Username:</p>
            <p>{seller.seller_username}</p>
          </div>
          <div className="flex gap-1">
            <p>Password:</p>
            <p>{seller.seller_password}</p>
          </div>
          <div className="flex gap-1">
            <p>Email:</p>
            <p>{seller.seller_email}</p>
          </div>
          </div>
          <Link to="/welcome/change-profile">
            <button className="flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]">Change Profile</button>
          </Link>
        </div>
    </div>
  );
};

export default Profile;
