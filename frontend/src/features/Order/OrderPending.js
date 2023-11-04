import React from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const OrderPending = () => {
	const customer_id = Cookies.get("customer_id");
	const { data } = useFetch(`http://localhost:3500/order/pending/${customer_id}`);

    // const hasOrders = data.length > 0;
	// Cookies.set("has_orders", hasOrders ? true : false);

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
		<div className="flex flex-col mb-10 justify-center text-black font-Rubik items-center gap-10">
			<h1 className="mt-10 flex text-3xl justify-center font-bold text-zinc-900 font-Rubik items-center gap-10">Your Order</h1>
			<div className="grid grid-cols-4 gap-4">
				{groupedOrders.map((group) => (
					<Link to={`/welcome/order/${group.order_id}`} className="rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
						<div key={`${group.order_id}-${group.customer_name}`}>
							<p className="font-bold">Order #{group.order_id}</p>
							{group.items.map((item, index) => (
								<div key={index} className="flex justify-between items-center gap-4">
									<p>{item.item_name}</p>
									<p>Qty: {item.quantity}</p>
								</div>
							))}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default OrderPending;
