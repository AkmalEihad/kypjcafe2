import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Header from '../../components/Header';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const OrderHistory = () => {
    const seller_id = Cookies.get("seller_id");

    const { data } = useFetch(`http://localhost:3500/order/${seller_id}`)
    

    // Create a map to group items by order_id and customer_name
    const groupedData = new Map();

    data.forEach((order) => {
        const key = `${order.order_id}-${order.customer_name}`;
        if (!groupedData.has(key)) {
            groupedData.set(key, {
                order_id: order.order_id,
                customer_name: order.customer_name,
                items: [],
            });
        }
        groupedData.get(key).items.push({
            item_name: order.item_name,
            quantity: order.quantity,
        });
    });

    const groupedOrders = [...groupedData.values()];

    // Calculate total price
    let totalPrice = 0;
    data.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    return (
        <div>
            <Header/>
        <div className='flex mt-20 mb-20 justify-center items-center gap-10'>
            {groupedOrders.map((group) => (
                <Link to={`${group.order_id}`}><div key={`${group.order_id}-${group.customer_name}`} className='rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer'>
                    <p>Order ID: {group.order_id}</p>
                    <p>Customer Name: {group.customer_name}</p>
                    {group.items.map((item, index) => (
                        <div key={index} className='flex'>
                            <p>{item.item_name}</p>
                            <p> : {item.quantity}</p>
                        </div>
                    ))}
                </div></Link>
            ))}
        </div>
        </div>
    )
}

export default OrderHistory