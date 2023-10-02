import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();

	const [seller_name, setName] = useState('');
	const [seller_username, setUsername] = useState('');
	const [seller_password, setPassword] = useState('');
	const [seller_email, setEmail] = useState('');

	const handleNameChange = (e) => setName(e.target.value);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const registrationData = {
			seller_name,
			seller_username,
			seller_password,
			seller_email,
		};

		try {
			const response = await fetch('http://localhost:3500/seller', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(registrationData),
			});

			if (response.ok) {
				navigate('/');
			} else {
				console.log('Registration Failed!');
			}
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};

	return (
		<div className='flex bg-gray-200 font-Poppins'>
			<img src="https://i.pinimg.com/564x/f1/e2/82/f1e282268c878b2e7897b4e4528b1bb1.jpg" alt="" className="h-screen drop-shadow-lg"/>
			<div className="flex flex-col justify-center items-start m-auto">
				<h1 className="font-bold text-5xl text-center mb-10">Sign Up</h1>
				<form action="" className="grid justify-center items-center grid-rows-4 gap-10 drop-shadow-lg" onSubmit={handleSubmit}>
					<div className="relative grid grid-cols-2 gap-4">
						<input id="name" value={seller_name} onChange={handleNameChange} type="text" className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
						<label
							htmlFor=""
							className={`absolute left-3 ${seller_name ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('seller_name').focus();
							}}
						>
							{seller_name ? 'Name' : 'Name'}
						</label>
						<div className="relative">
							<input id="username" value={seller_username} onChange={handleUsernameChange} type="text" className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
							<label
								htmlFor=""
								className={`absolute left-3 ${seller_username ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
								onClick={() => {
									document.getElementById('username').focus();
								}}
							>
								{seller_username ? 'Username' : 'Username'}
							</label>
						</div>
					</div>
					<div className="relative">
						<input id="password" value={seller_password} onChange={handlePasswordChange} type="password" className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
						<label
							htmlFor=""
							className={`absolute left-3 ${seller_password ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('password').focus();
							}}
						>
							{seller_password ? 'Password' : 'Password'}
						</label>
					</div>
					<div className="relative">
						<input id="email" value={seller_email} onChange={handleEmailChange} type="mail" className="border border-gray-300 w-full py-2 px-3 rounded-xl focus:border-black focus:outline-none" required />
						<label
							htmlFor=""
							className={`absolute left-3 ${seller_email ? '-top-6 left-1 text-black text-s font-medium' : 'top-2 text-gray-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('email').focus();
							}}
						>
							{seller_email ? 'Email' : 'Email'}
						</label>
					</div>
					<input type="submit" value="Sign Up" className="rounded-3xl w-full px-3 py-2 transition ease-in-out delay-60 bg-[#c4942f]  hover:-translate-y-1 hover:scale-110  hover:text-white hover:bg-black duration-300 font-medium" />
				</form>
				<p className="text-center text-sm mt-4">
					Already have an account?{' '}
					<Link to="/" className="underline underline-offset-2 font-medium">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
