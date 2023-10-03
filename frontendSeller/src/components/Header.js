import React from 'react'
import { Link, useParams } from 'react-router-dom'


const Header = () => {
  return (
    <header className='flex justify-between items-center mx-32 p-10'>
        <Link to="/welcome"><img src="https://kypj4u.com/wp-content/uploads/2021/07/kypj-logo.png" alt="" className='w-40'/></Link>

        <nav>
            <ul className='flex justify-end items-center gap-10'>
                <li className='font-medium'><Link to="/about">About Us</Link></li>
                <li className='font-medium'><Link to="/recentOrder">Recent Order</Link></li>
                <li className='font-medium'><Link to="/profile">Profile</Link></li>
                <li className='rounded px-3 py-2 transition ease-in-out delay-60 bg-[#c4942f]  hover:-translate-y-1 hover:scale-110  hover:text-white hover:bg-black duration-300 font-medium'><Link to="/">Sign Out</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header


