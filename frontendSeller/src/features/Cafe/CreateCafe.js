import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const CafeFeed = () => {
  const [cafe_name, setCafeName] = useState("");
  const [description, setDescription] = useState("");
  const [cafe_location, setLocation] = useState("");
  const [cafe_image_url, setImage] = useState();

  const navigate = useNavigate();

  const { data } = useFetch("http://localhost:3500/cafe");

  const seller_id = Cookies.get("seller_id");
  console.log(seller_id);

  // Inside your CafeFeed component
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append('cafeImage', cafe_image_url)
      formData.append('cafe_name', cafe_name)
      formData.append('description', description)
      formData.append('cafe_location', cafe_location)
      formData.append('seller_id', seller_id)


      const response = await axios.post('http://localhost:3500/cafe/upload', formData)

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful");
        navigate('/welcome')
        // You can also access the response data if the server sends any.
        console.log("Server response data:", response.data);
      } else {
        console.error("Registration failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  return (
    <div id="cafe" className="flex flex-col justify-center items-center p-4">
      <h1 className="font-medium text-center text-3xl">Create Cafe</h1>
      <form
        action=""
        encType="multipart/form-data"
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
        <div className="relative">
          <label
            htmlFor=""
            onClick={() => {
              document.getElementById("image").focus();
            }}
          >
            Image
          </label>
          <input
            id="image"
            name="cafeImage"
            type="file" // Specify accepted file types if needed
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
            required
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="rounded w-full px-3 py-2 transition ease-in-out delay-60 bg-[#c4942f]  hover:-translate-y-1 hover:scale-110  hover:text-white hover:bg-black duration-300 font-medium"
        />
      </form>
    </div>
  );
};

export default CafeFeed;
