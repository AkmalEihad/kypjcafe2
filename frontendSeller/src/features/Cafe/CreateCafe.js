import React from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const CreateCafe = () => {
  const [cafe_name, setCafeName] = useState("");
  const [description, setDescription] = useState("");
  const [cafe_location, setLocation] = useState("");
  const [cafe_image_url, setImage] = useState();

  const navigate = useNavigate();

  const { data } = useFetch("http://localhost:3500/cafe");

  const seller_id = Cookies.get("seller_id");
  console.log(seller_id);

  // Inside your CreateCafe component
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("cafeImage", cafe_image_url);
      formData.append("cafe_name", cafe_name);
      formData.append("description", description);
      formData.append("cafe_location", cafe_location);
      formData.append("seller_id", seller_id);

      const response = await axios.post(
        "http://localhost:3500/cafe/upload",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful");
        navigate("/welcome");
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
    <div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
      <Header />
      <h1 className="mt-10 text-white font-Rubik text-2xl text-center">
        Create Cafe
      </h1>

      <form
        action=""
        encType="multipart/form-data"
        className="grid justify-center items-center grid-rows-2 mt-20  gap-10 drop-shadow-lg font-Rubik"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <input
            id="cafe_name"
            type="text"
            value={cafe_name}
            onChange={(e) => setCafeName(e.target.value)}
            className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
            required
          />
          <label
            htmlFor=""
            className={`absolute left-3 ${
              cafe_name
                ? "-top-6 left-1 text-white text-s"
                : "top-2 text-zinc-900"
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
            className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
            required
          />
          <label
            htmlFor=""
            className={`absolute left-3 ${
              description
                ? "-top-6 left-1 text-white text-s"
                : "top-2 text-zinc-900"
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
            className="w-full px-3 py-2 bg-white text-zinc-900 border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none"
            required
          />
          <label
            htmlFor=""
            className={`absolute left-3 ${
              cafe_location
                ? "-top-6 left-1 text-white text-s"
                : "top-2 text-zinc-900"
            } transition-all duration-200`}
            onClick={() => {
              document.getElementById("location").focus();
            }}
          >
            {cafe_location ? "Location" : "Location"}
          </label>
        </div>
        <div className="relative ">
          <label
            htmlFor=""
            className="text-white relative left-3 "
            onClick={() => {
              document.getElementById("cafeImage").focus();
            }}
          >
            Image
          </label>
          <input
            id="cafeImage"
            name="cafeImage"
            type="file" // Specify accepted file types if needed
            accept="image/jpg, image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files[0])}
            className="flex rounded-3xl text-zinc-900 bg-zinc-200 w-full focus:outline-none file-input file-input-bordered file-input-primary w-full max-w-xs"
            required
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-green-500 to-lime-700 hover:cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateCafe;
