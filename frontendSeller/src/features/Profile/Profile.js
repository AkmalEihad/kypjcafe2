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
    <div>
      <Header />
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl">Profile</h1>
        <div className="flex flex-col gap-4">
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
          <Link to="/change-profile">
            <button>Change Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
