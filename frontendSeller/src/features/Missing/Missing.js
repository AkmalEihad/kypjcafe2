import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Missing = () => {
	return (
		<div className="h-screen flex justify-center items-center m-auto">
			<div className="flex justify-center items-center bg-white rounded-lg p-4">
				<img src={process.env.PUBLIC_URL + '/missing.jpg'} alt="" className="rounded-l-lg" />

				<div className="p-4 flex flex-col justify-center items-center text-black">
					<h2 className="text-9xl font-bold mb-10">404</h2>
					<p className="text-xl mb-2">Woops! Looks Like This Page Doesn't Exist</p>
                    <Link to="/"><button className="text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0]">Go Home</button></Link>
				</div>
			</div>
		</div>
	);
};

export default Missing;
