import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateMenu = () => {
    const { item_id } = useParams()
    const [item_name, setItemName] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [is_available, setIsAvailable] = useState();
    const [item_image_url, setImage] = useState(null);


    const seller_id = Cookies.get("seller_id");
    const navigate = useNavigate();
    const { data } = useFetch(`http://localhost:3500/menu/item/${item_id}`);

    // Use useEffect to update state when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            const menuData = data[0];
            setItemName(menuData.item_name);
            setCategories(menuData.categories);
            setPrice(menuData.price);
            setIsAvailable(menuData.is_available);
        }
    }, [data]);

    // Inside your CafeFeed component
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('is_available', is_available);
            formData.append('item_name', item_name);
            formData.append('price', price);
            formData.append('categories', categories);
            formData.append('itemImage', item_image_url);
            formData.append('item_id', item_id);

            const response = await axios.patch('http://localhost:3500/menu', formData);

            if (response.status === 200 || response.status === 201) {
                console.log("Update successful");
                navigate('/welcome/menu');
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

        <div id="cafe" className="flex flex-col justify-center items-center p-4 text-white font-Rubik antialiased">
            <h1 className="text-white font-medium text-center text-3xl mb-8">Update Menu</h1>
            <form
                action=""
                encType='multipart/form-data'
                className="grid justify-center items-center grid-rows-2 gap-10 drop-shadow-lg"
                onSubmit={handleSubmit}>

                <div className='flex gap-1'>
                    <p>Is item available?</p>
                    <input type="checkbox" className="toggle toggle-success" checked={is_available} // Set the initial state based on the "is_open" status from the database
                        onChange={(e) => {
                            const is_open = e.target.checked;
                            setIsAvailable(is_open); // Update the state in your component
                        }} />
                </div>

                <div className="relative">
                    <input
                        id="item_name"
                        type="text"
                        value={item_name}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
                        required />

                    <label
                        htmlFor=""
                        className={`absolute left-3 ${item_name ? '-top-6 left-1 text-white text-s ' : 'top-2 text-zinc-900'} transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("item_name").focus();
                        }}>

                        {item_name ? "Item Name" : "Item Name"}
                    </label>
                </div>

                <div className="relative">
                    <input
                        id="categories"
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
                        required />

                    <label
                        htmlFor=""
                        className={`absolute left-3 ${categories ? '-top-6 left-1 text-white text-s ' : 'top-2 text-zinc-900'} transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("categories").focus();
                        }}>

                        {categories ? "Categories" : "Categories"}
                    </label>

                </div>

                <div className="relative">
                    <input
                        id="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-white border text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
                        required />

                    <label
                        htmlFor=""
                        className={`absolute left-3 ${price ? '-top-6 left-1 text-white text-s ' : 'top-2 text-zinc-900'} transition-all duration-200`}
                        onClick={() => {
                            document.getElementById("price").focus();
                        }}>

                        {price ? "Price" : "Price"}

                    </label>

                    <div className="max-w-sm item-center justify-center m-auto">

                        <label
                            htmlFor="itemImage"
                            onClick={() => {
                                document.getElementById("itemImage").focus();
                            }}
                        >Change Image</label>
                        <input
                            id="itemImage"
                            name="itemImage"
                            type="file" // Specify accepted file types if needed
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
                        />
                    </div>

                </div>

                <input
                    type="submit"
                    value="Update"
                    className="w-32 px-3 py-2 m-auto text-zinc-900 transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-zinc-900 bg-gradient-to-r from-yellow-200 to-yellow-500 hover:from-lime-200 hover:to-green-700" />

            </form>

        </div>

    );
}

export default UpdateMenu