import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

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
			<h1>Your Order Detail</h1>
			<div className="flex">
				<h2>Your number is </h2>
				<p>{data.length > 0 ? data[0].order_id : 'No order ID found'}</p>
			</div>
			<div>
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
			<button onClick={cancelOrder}>Cancel</button>
			<br />
			<button onClick={receiveOrder}>Received</button>
		</div>
	);
};

export default ConfirmOrder;
