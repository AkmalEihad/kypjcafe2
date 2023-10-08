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
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl">Profile</h1>
            <div className="flex flex-col gap-4">
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
              <Link to="/change-profile">
                <button>Change Profile</button>
              </Link>
            </div>
          </div>
        </div>
      );
}

export default Profile