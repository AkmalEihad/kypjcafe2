import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'

const MenuNav = () => {
    const { cafe_id } = useParams()
    const { data } = useFetch(`http://localhost:3500/menu/${cafe_id}`)
  return (
    <nav className='px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg w-fit m-auto'>
        <ul className='flex justify-center items-center gap-4'>
            <li>All</li>
            {data.map((item) => (
                <li key={item.item_id}>{item.categories}</li>
            ))}
        </ul>
    </nav>
  )
}

export default MenuNav