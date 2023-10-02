import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'

const MenuNav = () => {
    const { cafe_id } = useParams()
    const { data } = useFetch(`http://localhost:3500/menu/${cafe_id}`)
  return (
    <nav className='bg-white rounded-lg p-4 w-fit m-auto'>
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