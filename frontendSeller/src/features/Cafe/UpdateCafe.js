import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateCafe = () => {
    const [cafe_name, setCafeName] = useState("");
    const [description, setDescription] = useState("");
    const [cafe_location, setLocation] = useState("");

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
            const formData = {
                cafe_id,
                cafe_name,
                cafe_location,
                description
            }

            const response = await fetch('http://localhost:3500/cafe', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.status === 200 || response.status === 201) {
                console.log("Update successful");
                navigate('/welcome');
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
        <div id="cafe" className="flex flex-col justify-center items-center p-4">
            <h1 className="font-medium text-center text-3xl">Update Cafe</h1>
            <form
                action=""
                className="grid justify-center items-center grid-rows-4 gap-5 drop-shadow-lg"
                onSubmit={handleSubmit}
            >
                <div className="relative">
                    <input
                        id="cafe_name"
                        type="text"
                        value={cafe_name}
                        onChange={(e) => setCafeName(e.target.value)}
                        className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
                        required
                    />
                    <label
                        htmlFor=""
                        className={`absolute left-3 ${cafe_name
                            ? "-top-6 left-1 text-black text-s font-medium"
                            : "top-2 text-gray-500"
                            } transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("cafe_name").focus();
                        }}
                    >
                        {cafe_name ? "Cafe Name" : "Cafe Name"}
                    </label>
                </div>
                <div className="relative">
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
                        required
                    />
                    <label
                        htmlFor=""
                        className={`absolute left-3 ${description
                            ? "-top-6 left-1 text-black text-s font-medium"
                            : "top-2 text-gray-500"
                            } transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("description").focus();
                        }}
                    >
                        {description ? "Description" : "Description"}
                    </label>
                </div>
                <div className="relative">
                    <input
                        id="location"
                        type="text"
                        value={cafe_location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
                        required
                    />
                    <label
                        htmlFor=""
                        className={`absolute left-3 ${cafe_location
                            ? "-top-6 left-1 text-black text-s font-medium"
                            : "top-2 text-gray-500"
                            } transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("location").focus();
                        }}
                    >
                        {cafe_location ? "Location" : "Location"}
                    </label>
                </div>
                <input
                    type="submit"
                    value="Update"
                    className="rounded w-full px-3 py-2 transition ease-in-out delay-60 bg-[#c4942f]  hover:-translate-y-1 hover:scale-110  hover:text-white hover:bg-black duration-300 font-medium"
                />
            </form>
        </div>
    );
}

export default UpdateCafe