import Cookies from 'js-cookie';
import React from 'react'
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const Menu = () => {
  const seller_id = Cookies.get('seller_id')
  const { data, isLoading, error } = useFetch(`http://localhost:3500/menu/${seller_id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center items-center gap-4 p-4 max-w-full font-Rubik antialiased">
      {data.map((item) => (
        <div key={item.item_id} className="px-3 py-3 mt-4 font-medium text-white bg-gradient-to-r  from-slate-400 to-slate-500 rounded-3xl drop-shadow-lg">
          <img src={`http://localhost:3500/images/${item.item_image_url}`} alt="" className="rounded-2xl w-52 max-h-[116px] m-auto" />
          <div className="flex justify-between items-center">
            <p>{item.item_name}</p>
            <p>{item.price}</p>
          </div>
          <Link to={`edit/${item.item_id}`}><button className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg">
            Edit
          </button></Link>
        </div>
      ))}
    </div>
  )
}

export default Menu