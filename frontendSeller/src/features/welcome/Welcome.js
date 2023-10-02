import React from 'react';
import { Link } from 'react-router-dom';
import CafeFeed from '../Cafe/CafeFeed';
import Header from '../../components/Header';

const Welcome = () => {
	return (
		<div>
			<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height">
				<Header/>
				{ <div className="flex justify-center items-center mt-20">
					<div className="mr-4">
						<h1 className="text-6xl font-bold">Welcome To KYPJ Cafe (SELLER)</h1>
						<p className="text-xl text-black">Nak makan tapi malas nak menunggu, malas nak beratur, orang ramai?!</p>
						<p className="text-xl text-black">Kini tidak lagi. Jom buat pesanan tanpa beratur</p>
						<a href="#cafe">
							<Link to = '/CafeFeed'><button className="transition ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300 rounded-lg py-2 px-4 font-medium drop-shadow-lg mt-4 text-white">Order Now</button></Link>
						</a>
					</div>
					<img src="https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg" alt="" className="rounded-lg drop-shadow-lg" />
				</div> }
			</div>
		</div>
	);
};

export default Welcome;
