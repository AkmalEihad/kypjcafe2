import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ExpiredSession = () => {
	return (
		<div className="h-screen flex justify-center items-center m-auto p-10">
			<div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center w-[500px]">
				<img src={process.env.PUBLIC_URL + '/lost.jpg'} alt="lost.jpg" className="w-40"/>
				<h1 className="text-2xl font-bold">Your Session Has Expired</h1>
				<p>
					Please sign in back to use this website.
				</p>
                <Link to="/"><button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]">Sign In</button></Link>
			</div>
		</div>
	);
};

export default ExpiredSession;
