import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const OrderHistory = () => {
	const seller_id = Cookies.get("seller_id");

	const { data } = useFetch(`http://localhost:3500/order/${seller_id}`);

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
		<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
			<Header />
			<div className="flex flex-col mb-10 justify-center text-black font-Rubik items-center gap-10">
				<h1 className="mt-10 flex text-3xl justify-center font-bold text-white font-Rubik items-center gap-10">Order History</h1>
				{groupedOrders.length > 0 ? (
					<div className="grid grid-cols-4 gap-4">
						{groupedOrders.map((group) => (
							<Link to={`${group.order_id}`} className="rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
								<div key={`${group.order_id}-${group.customer_name}`}>
									<p className="font-bold">Order ID #{group.order_id}</p>
									<p>Customer Name: <b>{group.customer_name}</b></p>
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
				) : (<p>No Order Yet In This Cafe</p>)}
			</div>
		</div>
	);
};

export default OrderHistory;
