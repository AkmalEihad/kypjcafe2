import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ItemFeed = () => {
	const [cart, setCart] = useState([]);
	const navigate = useNavigate();
	const { cafe_id } = useParams();
	const { data, isLoading, error } = useFetch(`http://localhost:3500/menu/${cafe_id}`);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// Function to add an item to the cart
	const addToCart = (item) => {
		const updatedCart = [...cart];
		const existingItem = updatedCart.find((cartItem) => cartItem.item_id === item.item_id);

		if (existingItem) {
			// If the item already exists in the cart, increase its quantity
			existingItem.quantity++;
		} else {
			// If it's a new item, add it to the cart with a quantity of 1
			updatedCart.push({ ...item, quantity: 1 });
		}

		setCart(updatedCart);
	};

	// Function to increase the quantity of an item in the cart
	const increaseQuantity = (item) => {
		const updatedCart = [...cart];
		const existingItem = updatedCart.find((cartItem) => cartItem.item_id === item.item_id);

		if (existingItem) {
			existingItem.quantity++;
			setCart(updatedCart);
		}
	};

	// Function to decrease the quantity of an item in the cart
	const decreaseQuantity = (item) => {
		const updatedCart = [...cart];
		const existingItem = updatedCart.find((cartItem) => cartItem.item_id === item.item_id);

		if (existingItem && existingItem.quantity > 1) {
			existingItem.quantity--;
			setCart(updatedCart);
		} else if (existingItem && existingItem.quantity === 1) {
			// If quantity reaches 1, remove the item from the cart
			const filteredCart = updatedCart.filter((cartItem) => cartItem.item_id !== item.item_id);
			setCart(filteredCart);
		}
	};

	const confirmOrder = async (e) => {
		const items = cart.map((item) => ({
			item_id: item.item_id,
			quantity: item.quantity,
		}));

		// Get the customer ID from the cookie
		const customer_id = Cookies.get('customer_id');
		// Prepare the order data to send to the server
		const createOrder = {
			customer_id,
		};

		// Check if customer_id is valid (optional)

		try {
			// Send a POST request to create the order
			const response = await fetch('http://localhost:3500/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(createOrder),
			});

			// Handle the response (success or error) as needed
			if (response.ok) {
				// Order created successfully
				const customerData = await response.json();
				const orderId = customerData.order[customerData.order.length - 1];
				const order_id = orderId.order_id;

				const dataForConfrimOrder = {
					order_id,
					items,
				};

				console.log(dataForConfrimOrder);

				const response1 = await fetch('http://localhost:3500/order/confirmOrder', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dataForConfrimOrder),
				});

				// Navigate to the order page with the order details as query parameters
				navigate(`/order/${order_id}`);
			} else {
				// Handle the error response
				console.error('Order creation failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error creating order:', error);
		}
	};

	return (
			<div className="flex justify-center items-center gap-4 p-4 max-w-full">
				{data.map((item) => (
					<div key={item.item_id} className="border-2 border-slate-500 rounded-lg w-80 p-4">
						<img src={item.item_image_url} alt="" className="rounded-lg w-52 max-h-[116px] m-auto"/>
						<div className="flex justify-between items-center">
							<p>{item.item_name}</p>
							<p>{item.price}</p>
						</div>
						<button className="rounded bg-blue-500 px-4" onClick={() => addToCart(item)}>
							Add Cart
						</button>
					</div>
				))}

				{/* Display the shopping cart */}
				<div>
					<h2>Shopping Cart</h2>
					{cart.map(
						(cartItem) =>
							cartItem.quantity > 0 && ( // Only render if quantity is greater than 0
								<div key={cartItem.item_id}>
									<p>{cartItem.item_name}</p>
									<p>Quantity: {cartItem.quantity}</p>
									{/* Quantity adjustment buttons */}
									<button onClick={() => increaseQuantity(cartItem)}>+</button>
									<button onClick={() => decreaseQuantity(cartItem)}>-</button>
								</div>
							)
					)}
					<button onClick={confirmOrder}>Confirm Order</button>
				</div>
			</div>
	);
};

export default ItemFeed;
