import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header";
import { BsBasket } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import Cookies from "js-cookie";

const ConfirmOrder = () => {
	const navigate = useNavigate();
	const [inProgress, setInProgress] = useState(true);
	const [completed, setCompleted] = useState(false);
	const progress = Cookies.set("progress", inProgress);
	const { order_id } = useParams();
	const has_order = Cookies.set("has_orders", true);
	Cookies.set("order_id", order_id);
	const { data } = useFetch(`http://localhost:3500/order/orderReceipt/${order_id}`);
	console.log(data);

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

	const cancelOrder = async (e) => {
		try {
			const response = await fetch(`http://localhost:3500/order/${order_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				navigate("/welcome/cancelOrder");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const receiveOrder = async (e) => {
		e.preventDefault();
		if (has_order === 'true') {
			navigate("/welcome");
		} else {
			setInProgress(false);
			setCompleted(true);
			Cookies.remove("progress");
			Cookies.set("progress", inProgress);
		}
	};

	return (
		<div>
			<Header />
			{inProgress ? (
				<div className="flex flex-col justify-center text-black font-Rubik items-center p-6">
					<div className="flex flex-col w-[400px]">
						<div className="flex justify-center items-center">
							<div className="flex justify-center items-center">
								<div className="flex flex-col justify-center items-center">
									<div className="w-14 h-14 rounded-full border-2 border-green-300 flex justify-center items-center">
										<div className="bg-green-300 w-12 h-12 rounded-full flex justify-center items-center">
											<BsBasket />
										</div>
									</div>
								</div>
								<hr className="border-2 w-24 m-auto border-green-300" />
							</div>

							<div className="flex justify-center items-center">
								<div className="flex justify-center items-start">
									<div className="w-14 h-14 rounded-full border-2 border-blue-300 flex justify-center items-center">
										<div className="bg-blue-300 w-12 h-12 rounded-full flex justify-center items-center">
											<GrInProgress />
										</div>
									</div>
								</div>
								<hr className="border-2 w-24 m-auto border-blue-300" />
							</div>

							<div className="flex justify-center items-start">
								<div className="flex justify-center items-start">
									<div className="w-14 h-14 rounded-full border-2 border-gray-300 flex justify-center items-center">
										<div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
											<AiOutlineCheck />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<p>Order Placed</p>
							<p>In Progress</p>
							<p>Completed</p>
						</div>
					</div>

					<div className="flex justify-center items-center mt-8 text-white">
						<h2>Your number is</h2>
						<p className="font-bold text-2xl">#{data.length > 0 ? data[0].order_id : "No order ID found"}</p>
					</div>
					<div className="mt-8 text-black rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
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

					<div className="flex flex-row mt-8 gap-2">
						<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-red-500 to-red-800" onClick={cancelOrder}>
							Cancel
						</button>
						<br />
						<button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" onClick={receiveOrder}>
							Received
						</button>
					</div>
				</div>
			) : completed ? (
				<div className="flex flex-col justify-center text-black font-Rubik items-center p-6">
					<div className="flex flex-col w-[400px] mb-10">
						<div className="flex justify-center items-center">
							<div className="flex justify-center items-center">
								<div className="flex flex-col justify-center items-center">
									<div className="w-14 h-14 rounded-full border-2 border-green-300 flex justify-center items-center">
										<div className="bg-green-300 w-12 h-12 rounded-full flex justify-center items-center">
											<BsBasket />
										</div>
									</div>
								</div>
								<hr className="border-2 w-24 m-auto border-green-300" />
							</div>

							<div className="flex justify-center items-center">
								<div className="flex justify-center items-start">
									<div className="w-14 h-14 rounded-full border-2 border-green-300 flex justify-center items-center">
										<div className="bg-green-300 w-12 h-12 rounded-full flex justify-center items-center">
											<GrInProgress />
										</div>
									</div>
								</div>
								<hr className="border-2 w-24 m-auto border-green-300" />
							</div>

							<div className="flex justify-center items-start">
								<div className="flex justify-center items-start">
									<div className="w-14 h-14 rounded-full border-2 border-green-300 flex justify-center items-center">
										<div className="bg-green-300 w-12 h-12 rounded-full flex justify-center items-center">
											<AiOutlineCheck />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<p>Order Placed</p>
							<p>In Progress</p>
							<p>Completed</p>
						</div>
					</div>

					<div>
						<h1 className="text-center text-3xl">Order Completed!</h1>

						<div className="flex flex-col gap-4">
							<div className="mt-8 text-black rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
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

							<button
								className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0] "
								onClick={(e) => {
									navigate("/welcome");
								}}
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			) : (
				<p>error</p>
			)}
		</div>
	);
};

export default ConfirmOrder;
