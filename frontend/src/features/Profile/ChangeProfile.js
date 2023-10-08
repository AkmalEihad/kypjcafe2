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
                                value={name}
                                onChange={handleNameChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Faculty:</label>
                            <input
                                id="faculty"
                                value={faculty}
                                onChange={handleFacultyChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                value={email}
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
