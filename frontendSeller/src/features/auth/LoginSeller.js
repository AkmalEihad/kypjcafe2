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
		
		<div className="flex page bg-gradient-to-r from-slate-200 to-slate-500 font-Rubik text-zinc-900 antialiased">
			<img src="https://i.pinimg.com/750x/0a/d3/41/0ad341e9715994f5b7266e0a5062a46a.jpg" alt="" className="h-screen drop-shadow-lg" />

			<div className="flex flex-col items-start justify-center m-auto">

				<h1 className="font-bold antialiased text-5xl text-center mb-2">Welcome Seller</h1>

				<h1 className="antialiased mb-10 text-4xl font-bold text-center">Sign In</h1>

				<form action="" className="flex flex-col items-start justify-center gap-8 mb-4 rounded-3xl drop-shadow-lg w-96" onSubmit={handleSubmit}>

					<div className="relative w-full">

						<input id="username" type="text" value={username} onChange={handleUsernameChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

						<label
							htmlFor=""
							className={`absolute left-3 ${username ? '-top-6 left-1 text-white-500 text-s ' : 'top-2 text-white-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('username').focus();
							}}
						>
							{username ? 'Username' : 'Username'}
						</label>
					</div>
					<div className="relative w-full">
						<input id="password" value={password} onChange={handlePasswordChange} type="password" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-zinc-500 focus:outline-none" required />

						<label
							htmlFor=""
							className={`absolute left-3 ${password ? '-top-6 left-1 text-black-500 text-s' : 'top-2 text-white-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('password').focus();
							}}
						>
							{password ? 'Password' : 'Password'}
						</label>
					</div>
					<input type="submit" value="Log Masuk" className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" />
				</form>
				<p className="w-full text-sm text-center px-3py-2">
					Don't have an account?{' '}
					<Link to="signup" className="text-sm  underline hover:text-[15px] mt-4 hover:mt-8 underline-offset-2">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
