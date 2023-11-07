import React, { useEffect, useState } from "react";
import CafeFeed from "../Cafe/CafeFeed";
import Header from "../../components/Header";
import { BsArrowDownShort } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
import { Link } from 'react-router-dom';

const Welcome = () => {
	const { data } = useFetch("http://localhost:3500/menu");

	const [shuffledItems, setShuffledItems] = useState([]);

	useEffect(() => {
		if (data) {
			const availableItems = data.filter((item) => item.is_available);
			shuffleArray(availableItems);
			setShuffledItems(availableItems.slice(0, 10));
		}
	}, [data]);

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	return (
		<div>
			<div className=" bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')]">
				<Header />
				
				
				<div className="flex flex-col items-start justify-center max-w-5xl gap-10 m-auto p-4 widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height">
					<div className="flex flex-col sm:flex-row">
						<div className=" text-white">
							<h1 className="text-6xl font-bold ">Welcome To KYPJ Cafe</h1>
							<p className="text-xl">Nak makan tapi malas nak menunggu, malas nak beratur, orang ramai?</p>
							<p className="text-xl ">Kini tidak lagi. Jom buat pesanan tanpa beratur.</p>
							<a href="#cafe">
								<button className="px-4 flex justify-center items-center py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-700 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-700 to-slate-800 rounded-3xl drop-shadow-lg">
									Order Now <BsArrowDownShort />
								</button>
							</a>
						</div>
						<img src="https://i.pinimg.com/564x/8f/a6/30/8fa630987ba54d4c965e71ecb739d6a5.jpg" alt="" className="hidden sm:block shadow-lg rounded-md" />
					</div>
					<div className="">
						<h1 className="text-xl text-white">Recommended Menu</h1>
						<div className="carousel w-96 gap-2">
							{shuffledItems.map((item) => (
								<Link to={`menu/${item.cafe_id}`} className="carousel-item flex flex-col px-3 py-3 font-medium text-white bg-gradient-to-r  from-slate-400 to-slate-500 rounded-3xl drop-shadow-lg gap-4"><div key={item.item_id} >
									<img src={`http://localhost:3500/images/${item.item_image_url}`} alt="" className="rounded-2xl w-52 max-h-[116px] m-auto" />
									<div className="flex justify-between items-center">
										<p>{item.item_name}</p>
										<p>RM{item.price}</p>
									</div>
								</div></Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<CafeFeed />
		</div>
	);
};

export default Welcome;
