import React from 'react';
import CafeFeed from '../Cafe/CafeFeed';
import Header from '../../components/Header';

const Welcome = () => {
	return (
		<div>
			<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')]">
			<Header/>
				 <div className="flex items-center justify-center">
					<div className="mr-4 mt-8 text-white">

						<h1 className="text-6xl font-bold ">Welcome To KYPJ Cafe</h1>
						<p className="text-xl">Nak makan tapi malas nak menunggu, malas nak beratur, orang ramai?</p>
						<p className="text-xl ">Kini tidak lagi. Jom buat pesanan tanpa beratur.</p>
						<a href="#cafe">
							<button className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-700 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-700 to-slate-800 rounded-3xl drop-shadow-lg">Order Now</button>
						</a>
					</div>
				</div> 
				<CafeFeed/>
			</div>
		</div>
	);
};

export default Welcome;
