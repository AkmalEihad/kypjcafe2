import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import OrderFeed from './OrderFeed';

const Order = ({cafe_id}) => {
    console.log(cafe_id)
    const cafeid = Cookies.set("cafe_id", cafe_id)
    const seller_id = Cookies.get("seller_id");
    const { data } = useFetch(`http://localhost:3500/cafe/${seller_id}`)
    const [isCafeOpen, setIsCafeOpen] = useState()

    useEffect(() => {
        // Check if data is available and has the expected structure
        if (data && data.length > 0) {
            setIsCafeOpen(data[0].is_open);
        }
    }, [data]);



    const handleOpenCafe = async (is_open) => {
        try {
            const openData = {
                is_open,
                seller_id
            }
            // Send a request to the backend to update the "is_open" status
            const response = await fetch('http://localhost:3500/cafe/openCafe', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(openData), // Send the new status
            });

            if (response.status === 200 || response.status === 201) {
                console.log(`Cafe ${is_open ? 'opened' : 'closed'} successfully`);
            } else {
                console.error(`Failed to ${is_open ? 'open' : 'close'} cafe with status code:`, response.status);
                // Handle the error and provide user feedback
            }
        } catch (error) {
            console.error('Error during status update:', error);
            // Handle the error and provide user feedback
        }
    };


    return (
        <div className='font-medium text-center text-white '>
            <div className='flex justify-center items-center gap-8 mb-5 '>
                <h1>Order</h1>
                <div className='flex gap-1'>
                    <p>Open Cafe?</p>
                    <input type="checkbox" className="toggle toggle-success" checked={isCafeOpen} // Set the initial state based on the "is_open" status from the database
                        onChange={(e) => {
                            const is_open = e.target.checked;
                            setIsCafeOpen(is_open); // Update the state in your component
                            handleOpenCafe(is_open); // Call the function to update the backend
                        }} />
                </div>
            </div>
            {isCafeOpen ? (<OrderFeed cafe_id={cafe_id} />) : (
                <p>Cafe Is Close</p>
            )}
        </div>
    );
};

export default Order;
