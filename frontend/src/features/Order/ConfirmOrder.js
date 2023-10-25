import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Header from '../../components/Header';


const ConfirmOrder = () => {
	const navigate = useNavigate();
	const { order_id } = useParams();
	const { data } = useFetch(`http://localhost:3500/order/orderReceipt/${order_id}`);
	console.log(data);

	const isoDateString = data.length > 0 ? data[0].order_date : null;
	let formattedDate = 'No order date found';

	if (isoDateString) {
		const date = new Date(isoDateString);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		formattedDate = date.toLocaleDateString('en-US', options);
	}

	const cancelOrder = async (e) => {
		try {
			const response = await fetch(`http://localhost:3500/order/${order_id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				navigate('/cancelOrder');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const receiveOrder = async (e) => {
		e.preventDefault()
		navigate('/welcome')
	}

	return (
		<div>
			<Header/>
		<div className='flex flex-col justify-center text-black font-Rubik items-center'>
			<h1 className="flex justify-center text-white text-3xl mt-8">Your Order Detail</h1>
			<div className="flex mt-8 text-white">
				<h2>Your number is </h2>
				<p>{data.length > 0 ? data[0].order_id : 'No order ID found'}</p>
			</div>
			<div className='mt-8 text-black rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer'>
				{data.map((i) => (
					<div key={i.order_item_id}>
						<div className="flex">
							<p>{i.item_name} x </p>
							<p>{i.quantity}</p>
						</div>
						<p>RM{i.price * i.quantity}</p>
					</div>
				))}
				<p>{formattedDate}</p>
			</div>

			<div className="flex flex-row mt-8 gap-2">
			<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-red-500 to-red-800" onClick={cancelOrder}>Cancel</button>
			<br />
			<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" onClick={receiveOrder}>Received</button>
			</div>
		</div>
		</div>
	);
};

export default ConfirmOrder;
