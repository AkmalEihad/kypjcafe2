import React from 'react';
import CafeFeed from '../Cafe/CafeFeed';
import Header from '../../components/Header';

const Welcome = () => {
	return (
		<div>
			<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height">
				<Header/>
				{ <div className="flex items-center justify-center mt-20">
					<div className="mr-4">
						<h1 className="text-6xl font-bold ">Welcome To KYPJ Cafe</h1>
						<p className="text-xl">Nak makan tapi malas nak menunggu, malas nak beratur, orang ramai?!</p>
						<p className="text-xl ">Kini tidak lagi. Jom buat pesanan tanpa beratur</p>
						<a href="#cafe">
							<button className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-slate-800 rounded-3xl drop-shadow-lg">Order Now</button>
						</a>
					</div>
					<img src="https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg" alt="" className="rounded-lg drop-shadow-lg"/>
				</div> }
				<CafeFeed/>
			</div>
		</div>
	);
};

export default Welcome;
