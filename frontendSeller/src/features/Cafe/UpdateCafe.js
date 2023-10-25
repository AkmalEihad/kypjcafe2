import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import axios from "axios";

const UpdateCafe = () => {
	const [cafe_name, setCafeName] = useState("");
	const [description, setDescription] = useState("");
	const [cafe_location, setLocation] = useState("");
	const [cafe_image_url, setImage] = useState(null);

	const [cafe_id, setCafeId] = useState();

	const seller_id = Cookies.get("seller_id");
	const navigate = useNavigate();
	const { data } = useFetch(`http://localhost:3500/cafe/${seller_id}`);

	// Use useEffect to update state when data is available
	useEffect(() => {
		if (data && data.length > 0) {
			const cafeData = data[0];
			setCafeName(cafeData.cafe_name);
			setDescription(cafeData.description);
			setLocation(cafeData.cafe_location);
			setCafeId(cafeData.cafe_id);
		}
	}, [data]);

	// Inside your CafeFeed component
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append("cafeImage", cafe_image_url);
			formData.append("cafe_name", cafe_name);
			formData.append("description", description);
			formData.append("cafe_location", cafe_location);
			formData.append("cafe_id", cafe_id);

			console.log("Form Data Contents:");
			for (const pair of formData.entries()) {
				console.log(pair[0], pair[1]);
			}

			const response = await axios.patch('http://localhost:3500/cafe/update', formData);

			if (response.status === 200 || response.status === 201) {
				console.log("Update successful");
				navigate("/welcome");
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
		<div id="cafe" className="flex flex-col justify-center items-center p-4 text-black font-Rubik antialiased">
			<h1 className="text-zinc-900 text-center text-3xl mb-8">Update Cafe</h1>
			<form action="" encType="multipart/form-data" className="grid justify-center items-center grid-rows-4 gap-5 drop-shadow-lg" onSubmit={handleSubmit}>
				<div className="relative mb-2">
					<input id="cafe_name" type="text" value={cafe_name} onChange={(e) => setCafeName(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${cafe_name ? "-top-6 left-1 text-zinc-900 text-s " : "top-2 text-zinc-900-500"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("cafe_name").focus();
						}}
					>
						{cafe_name ? "Cafe Name" : "Cafe Name"}
					</label>
				</div>

				<div className="relative">
					<input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${description ? "-top-6 left-1 text-zinc-900 text-s " : "top-2 text-zinc-900-500"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("description").focus();
						}}
					>
						{description ? "Description" : "Description"}
					</label>
				</div>

				<div className="relative">
					<input id="location" type="text" value={cafe_location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

					<label
						htmlFor=""
						className={`absolute left-3 ${cafe_location ? "-top-6 left-1 text-zinc-900 text-s " : "top-2 text-zinc-900-500"} transition-all duration-200`}
						onClick={() => {
							document.getElementById("location").focus();
						}}
					>
						{cafe_location ? "Location" : "Location"}
					</label>
				</div>

				<label
					htmlFor=""
					onClick={() => {
						document.getElementById("image").focus();
					}}
					>
					Change Image
				</label>
				<input
					id="image"
					name="cafeImage"
					type="file" // Specify accepted file types if needed
					onChange={(e) => setImage(e.target.files[0])}
					className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
				/>

				<input type="submit" value="Update" className="w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-black bg-gradient-to-r from-yellow-200 to-yellow-500 hover:from-lime-200 hover:to-green-700" />
			</form>
		</div>
	);
};

export default UpdateCafe;
