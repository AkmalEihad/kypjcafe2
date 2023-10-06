import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <div className="min-h-screen text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
        <Outlet/>
        <hr className='border-slate-800'/>
        <Footer/>
    </div>
  )
}

export default Layout