import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Cookies from 'js-cookie';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const ChangeProfile = () => {
    const customer_id = Cookies.get('customer_id');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [faculty, setFaculty] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate()

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

        const updateData = {
            customer_id,
            name,
            username,
            password,
            faculty,
            email
        };

        try {
            const response = await fetch('http://localhost:3500/customer', {
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
        <div>
            <Header />
            <div className='flex justify-center mb-10 items-center flex-col font-Rubik text-zinc-900'>
                <h1 className='text-zinc-900 text-3xl mb-10'>Manage Profile</h1>
                <div className="card w-96 bg-gradient-to-r from-slate-500 to-slate-800 shadow-xl flex flex-col gap-4 px-5 py-5">
                    <form action="">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Faculty:</label>
                            <input
                                id="faculty"
                                value={faculty}
                                onChange={handleFacultyChange}
                                type="text"
                                className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none mb-3 mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                value={email}
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
