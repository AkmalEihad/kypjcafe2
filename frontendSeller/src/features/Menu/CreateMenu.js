import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const CreateMenu = () => {
	const [item_name, setItemName] = useState("");
	const [categories, setCategories] = useState("");
	const [price, setPrice] = useState();
	const [item_image_url, setImage] = useState();
    const navigate = useNavigate()

	const seller_id = Cookies.get("seller_id");
	const { data } = useFetch(`http://localhost:3500/cafe/${seller_id}`);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append("item_name", item_name);
			formData.append("categories", categories);
			formData.append("price", price);
			formData.append("cafe_id", data[0].cafe_id);
			formData.append("itemImage", item_image_url);

			const response = await axios.post("http://localhost:3500/menu", formData);

			if (response.status === 200 || response.status === 201) {
				console.log("Create successful");
				navigate("/welcome/menu");
				// You can also access the response data if the server sends any.
				console.log("Server response data:", response.data);
			} else {
				console.error("Update failed with status code:", response.status);
				// Handle the error and provide user feedback
			}
		} catch (error) {
			console.error("Error during update:", error);
			// Handle the error and provide user feedback
		}
	};

	return (
		<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
			<Header/>
			<h1 className="mt-10 text-white font-Rubik text-2xl text-center">Create Menu</h1>

			<form action="" encType="multipart/form-data" className="grid justify-center items-center grid-rows-2 mt-20 font-bold gap-10 drop-shadow-lg font-Rubik" onSubmit={handleSubmit}>

				<div className="relative">
					<input id="item_name" type="text" value={item_name} onChange={(e) => setItemName(e.target.value)} className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${item_name ? "-top-6 left-1 text-white text-s " : "top-2 text-zinc-900"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("item_name").focus();
						}}
					>
						{item_name ? "Item Name" : "Item Name"}
					</label>
				</div>

				<div className="relative">
					<input id="categories" type="text" value={categories} onChange={(e) => setCategories(e.target.value)} className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${categories ? "-top-6 left-1 text-white text-s " : "top-2 text-zinc-900"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("categories").focus();
						}}
					>
						{categories ? "Categories" : "Categories"}
					</label>
				</div>

				<div className="relative">
					<input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${price ? "-top-6 left-1 text-white text-s " : "top-2 text-zinc-900"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("price").focus();
						}}
					>
						{price ? "Price" : "Price"}
					</label>

					<div className="mt-10 text-white max-w-sm item-center justify-center m-auto">
						<label
							htmlFor="itemImage"
							onClick={() => {
								document.getElementById("itemImage").focus();
							}}
						>
							Put Image
						</label>

						<input
							id="itemImage"
							name="itemImage"
							type="file" // Specify accepted file types if needed
							accept="image/jpeg, image/jpg, image/png"
							onChange={(e) => setImage(e.target.files[0])}
							className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
						/>
					</div>
				</div>

				<input type="submit" value="Create" className="text-zinc-900 w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-black bg-gradient-to-r from-yellow-200 to-yellow-500 hover:from-lime-200 hover:to-green-700" />
			</form>
		</div>
	);
};

export default CreateMenu;
