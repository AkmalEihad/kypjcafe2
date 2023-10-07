import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import useFetch from '../../hooks/useFetch';
import Cookies from 'js-cookie';
import Create from '../Cafe/CreateCafe';
import Order from '../Order/Order';

const Welcome = () => {
	const seller_id = Cookies.get("seller_id");
	const navigate = useNavigate()
	const { data } = useFetch(`http://localhost:3500/cafe/${seller_id}`)
	const hasCafe = data.length > 0;
	console.log(data)
    console.log(hasCafe)
    console.log("WTF is happenning")

	return (
		<div>
			<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')]">

				<Header />

				<div className="font-Rubik flex flex-col items-center justify-center p-4">

					<h1 className='mt-6 mb-6 text-3xl font-medium text-center text-white'>Your Cafe</h1>

					{hasCafe ? (
						// Render cafe information if the seller has a cafe
						data.map((cafe) => (
							<div key={cafe.id} className=" text-black flex items-center justify-center m-auto transition duration-300 ease-in-out card max-w-fit max-h-max delay-60 hover:-translate-y-1 hover:scale-105">
								<img src={`http://localhost:3500/images/${cafe.cafe_image_url}`} alt="" className="max-w-full rounded-t-3xl h-52" />
								<div className="flex flex-col items-center justify-center min-w-full p-4 bg-white card-body rounded-b-3xl">
									<h3 className="card-title">{cafe.cafe_name}</h3>
									<p className="text-sm font-thin">{cafe.description}</p>
									<p className="font-medium">{cafe.cafe_location}</p>

								</div>
							</div>
						))
					) : (
						// Show a button to create a cafe if the seller doesn't have one
						<div className="flex flex-col items-center justify-center">
							<p>You don't have a cafe. Create one now!</p>
							<button onClick={() => navigate('/create-cafe')} className="...">Create Cafe</button>
						</div>
					)}

				</div>

				<div className='p-4'>
					<Order />
				</div>


			</div>
		</div>
	);
};

export default Welcome;
