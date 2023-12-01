import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Header from "../../../../frontendSeller/src/components/Header";
import Cookies from "js-cookie";

const OrderDetail = () => {
	const navigate = useNavigate();
	const { order_id } = useParams();
	const cafe_id = Cookies.get("cafe_id");
	const { data, isLoading, error } = useFetch(`http://localhost:3500/order/orderListSeller/${cafe_id}/${order_id}`);

	
	if (isLoading) {
		return <div>Loading...</div>;
	}


	const isoDateString = data.length > 0 ? data[0].order_date : null;
	let formattedDate = "No order date found";

	if (isoDateString) {
		const date = new Date(isoDateString);
		const options = { year: "numeric", month: "long", day: "numeric" };
		formattedDate = date.toLocaleDateString("en-US", options);
	}

	// Calculate total price
	let totalPrice = 0;
	data.forEach((item) => {
		totalPrice += item.price * item.quantity;
	});

	const orderCompleted = async (e) => {
		try {
			const response = await fetch(`http://localhost:3500/order/${order_id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				Cookies.set("confirm_order", true)
				navigate("/welcome");
				window.location.reload()
			}
		} catch (error) {
			console.log(error);
		}
	};

	const cancelOrder = async (e) => {
		const userConfirmed = window.confirm("Are you sure you want to cancel this order?");

		if (userConfirmed) {
			try {
				const response = await fetch(`http://localhost:3500/order/${order_id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					Cookies.set("cancel", true);
					navigate("/welcome");
					window.location.reload()
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<Header />
			<div className="flex mb-10 flex-col justify-center text-black font-Rubik items-center gap-10">
				<h1 className="mt-10 flex text-3xl justify-center text-zinc-900 font-Rubik items-center gap-10">{data.length > 0 ? data[0].customer_name : null } Order Detail</h1>
				<div className="flex text-xl justify-center text-zinc-900 font-Rubik items-center gap-2">
					<h2>Customer number is </h2>
					<p className="font-bold">#{data.length > 0 ? data[0].order_id : "No order ID found"}</p>
				</div>
				<div className="min-w-full">
					<div className="max-w-xl m-auto rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
						{data.map((i) => (
							<div key={i.order_item_id}>
								<p>{i.item_name}</p>
								<div className="flex justify-between gap-4">
									<p>Qty: {i.quantity}</p>
									<p>RM{i.price * i.quantity}</p>
								</div>
								<hr />
							</div>
						))}
						<br />
						<p className="font-bold text-lg">Total Price: RM{totalPrice}</p>
						<p className="text-sm text-gray-500">{formattedDate}</p>
					</div>
				</div>
				<div className="flex flex-row mt-8 gap-2">
					<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-red-500 to-red-800" onClick={cancelOrder}>
						Cancel
					</button>
					<br />
					<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" onClick={orderCompleted}>
						Complete
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
