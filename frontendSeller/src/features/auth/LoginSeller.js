import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const loginData = {
			username,
			password,
		};

		try {
			const response = await fetch('http://localhost:3500/auth/seller', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});

			if (response.ok) {
				// Authentication was successful, set the seller_id cookie
				const sellerData = await response.json(); // Assuming the server responds with customer data
				Cookies.set('seller_id', sellerData.seller_id);

				navigate('/welcome');
			} else {
				console.log('Login Failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		
		<div className="flex page bg-gray-200 font-Poppins ">
			<img src="https://i.pinimg.com/750x/0a/d3/41/0ad341e9715994f5b7266e0a5062a46a.jpg" alt="" className="h-screen drop-shadow-lg" />

			<div className="flex justify-center items-start flex-col m-auto">
				<h1 className="font-bold antialiased text-5xl text-center mb-2">Welcome Seller</h1>
				<h1 className="antialiased text-4xl text-center mb-10">Sign In</h1>
				<form action="" className="flex justify-center items-start flex-col gap-10 drop-shadow-lg rounded-xl w-96 mb-4" onSubmit={handleSubmit}>
					<div className="relative w-full">
						<input id="username" type="text" value={username} onChange={handleUsernameChange} className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
						<label
							htmlFor=""
							className={`absolute left-3 ${username ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('username').focus();
							}}
						>
							{username ? 'Username' : 'Username'}
						</label>
					</div>
					<div className="relative w-full">
						<input id="password" value={password} onChange={handlePasswordChange} type="password" className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
						<label
							htmlFor=""
							className={`absolute left-3 ${password ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('password').focus();
							}}
						>
							{password ? 'Password' : 'Password'}
						</label>
					</div>
					<input type="submit" value="Sign In" className="rounded-3xl w-full px-3 py-2 transition ease-in-out delay-60 bg-[#c4942f]  hover:-translate-y-1 hover:scale-110  hover:text-white hover:bg-black duration-300 font-medium" />
				</form>
				<p className="text-center text-sm mt-4">
					Don't have an account?{' '}
					<Link to="signup" className="underline underline-offset-2 font-medium">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
