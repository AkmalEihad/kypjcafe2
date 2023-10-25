import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Cookies from 'js-cookie';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const ChangeProfile = () => {
    const seller_id = Cookies.get('seller_id');
    const [seller_name, setName] = useState('');
    const [seller_username, setUsername] = useState('');
    const [seller_password, setPassword] = useState('');
    const [seller_email, setEmail] = useState('');

    const navigate = useNavigate()

    const { data } = useFetch(`http://localhost:3500/seller/${seller_id}`);

    // Use useEffect to update state when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            const sellerData = data[0];
            setName(sellerData.seller_name);
            setUsername(sellerData.seller_username);
            setPassword(sellerData.seller_password);
            setEmail(sellerData.seller_email);
        }
    }, [data]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleChangeProfile = async (e) => {
        e.preventDefault();

        const updateData = {
            seller_id,
            seller_name,
            seller_username,
            seller_password,
            seller_email,
        };

        try {
            const response = await fetch('http://localhost:3500/seller', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            // Handle response as needed
            if (response.ok) {
                navigate('/welcome/profile')
            }
            else {
                console.log("There is some error")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
			<div className="min-h-screen mb-10 text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
            <Header />
            <div className='flex justify-center items-center flex-col font-Rubik text-zinc-900'>
                <h1 className='text-zinc-900 text-3xl mb-10'>Change Profile</h1>
                <div className="px-4 py-2 mt-4 font-medium text-zinc-900 transition duration-300 ease-in-out delay-60 bg-gradient-to-r  from-slate-300 to-slate-500 rounded-3xl drop-shadow-lg card w-96 bg-opacity-80 shadow-xl flex flex-col gap-4 px-5 py-5">
                    <form action="">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                value={seller_name}
                                onChange={handleNameChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                value={seller_username}
                                onChange={handleUsernameChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                value={seller_password}
                                onChange={handlePasswordChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                value={seller_email}
                                onChange={handleEmailChange}
                                type="email"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        
                    </form>
                </div>
                <button className="flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]" onClick={handleChangeProfile} type="submit">
                            Save Changes
                        </button>
            </div>
        </div>
    );
};

export default ChangeProfile;
