import React from 'react'
import { Link, useParams } from 'react-router-dom'


const Header = () => {
  return (
    <header className='flex items-center justify-between p-3 mx-1 m-auto'>
      <Link to="/welcome"><img src="https://kypj4u.com/wp-content/uploads/2021/07/kypj-logo.png" alt="" className='w-40 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-110' /></Link>

      <nav>
        <ul className='flex items-center justify-end gap-5 antialiased text-zinc-100'>

          <Link to="/welcome/about"><li className='px-3 py-2 transition duration-300 ease-in-out bg-transparent rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-[#DFC461] hover:bg-zinc-900'>About Us</li></Link>

          <Link to="/welcome/recentOrder"><li className='px-3 py-2 transition duration-300 ease-in-out bg-transparent rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-[#DFC461] hover:bg-zinc-900'>Recent Order</li></Link>

          <Link to="/welcome/profile"><li className='px-3 py-2 transition duration-300 ease-in-out bg-transparent rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-[#DFC461] hover:bg-zinc-900'>Profile</li></Link>

          <Link to="/"><li className='text-zinc-900 rounded-3xl px-3 py-2 transition ease-in-out delay-60 bg-gradient-to-r from-[#DFC461] to-[#b8a14f] hover:-translate-y-1 hover:scale-110 hover:from-red-900 hover:to-red-800 duration-300'>Sign Out</li></Link>

        </ul>
      </nav>
    </header>
  )
}

export default Header