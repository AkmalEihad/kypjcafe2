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
                navigate('/profile')
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
            <div>
                <h1>Change Profile</h1>
                <div className="flex flex-col gap-4">
                    <form action="">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                value={seller_name}
                                onChange={handleNameChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                value={seller_username}
                                onChange={handleUsernameChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                value={seller_password}
                                onChange={handlePasswordChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                value={seller_email}
                                onChange={handleEmailChange}
                                type="email"
                            />
                        </div>
                        <button onClick={handleChangeProfile} type="submit">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfile;
