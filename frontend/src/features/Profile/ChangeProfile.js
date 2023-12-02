import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const ChangeProfile = () => {
	const customer_id = Cookies.get("customer_id");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [faculty, setFaculty] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const { data } = useFetch(`http://localhost:3500/customer/${customer_id}`);

	// Use useEffect to update state when data is available
	useEffect(() => {
		if (data && data.length > 0) {
			const custData = data[0];
			setName(custData.name);
			setUsername(custData.username);
			setPassword(custData.password);
			setFaculty(custData.faculty);
			setEmail(custData.email);
		}
	}, [data]);

	const handleNameChange = (e) => setName(e.target.value);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleFacultyChange = (e) => setFaculty(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);

	const handleChangeProfile = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		const updateData = {
			customer_id,
			name,
			username,
			password,
			faculty,
			email,
		};

		// Use a regular expression to check if the email follows the pattern
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValidEmail = emailPattern.test(email);

		if (isValidEmail || email === "") {
			setEmail(email);

			try {
				const response = await fetch("http://localhost:3500/customer", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				});
				// Handle response as needed
				if (response.ok) {
					navigate("/welcome/profile");
				} else {
					console.log("There is some error");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("Invalid email format");
			setError("Invalid Email!");
		}
	};

	return (
		<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
			<Header />
			<div className="flex justify-center mb-10 items-center flex-col font-Rubik text-zinc-900">
				<h1 className="text-white text-3xl mb-10">Manage Profile</h1>
				<div className="px-4 py-2 mt-4 font-medium text-zinc-900 transition duration-300 ease-in-out delay-60 bg-gradient-to-r  from-slate-300 to-slate-500 rounded-3xl drop-shadow-lg card w-96 bg-opacity-80 shadow-xl flex flex-col gap-4 px-5 py-5">
					<form action="">
						<div>
							<label htmlFor="name">Name:</label>
							<input id="name" value={name} onChange={handleNameChange} type="text" className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2" />
						</div>
						<div>
							<label htmlFor="username">Username:</label>
							<input id="username" value={username} onChange={handleUsernameChange} type="text" className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2" />
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<input id="password" value={password} onChange={handlePasswordChange} type="password" className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2" />
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2" />
						</div>

						<div className="flex flex-col justify-start items-start gap-2">
							<label htmlFor="">Faculty</label>

							<select id="faculty" name="faculty" onChange={handleFacultyChange} className="p-2 rounded-3xl bg-white">
								<option value="Tiada">-Tiada-</option>
								<option value="Pengurusan Dan Sains Sosial">Pengurusan Dan Sains Sosial</option>
								<option value="Kejuteraan Dan Sains Kreatif">Kejuteraan Dan Sains Kreatif</option>
								<option value="Hospitaliti Dan Pelancongan">Hospitaliti Dan Pelancongan</option>
							</select>
						</div>
						<div className="pt-2">
							<label htmlFor="email">Email:</label>
							<input id="email" value={email} onChange={handleEmailChange} type="email" className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2" />
						</div>
					</form>
				</div>
				{error && <p className="text-red-500 text-sm ml-2">{error}</p>}
				<button className="flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" onClick={handleChangeProfile} type="submit">
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default ChangeProfile;
