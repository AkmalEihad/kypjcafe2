import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CafeFeed = () => {
	const { data } = useFetch('http://localhost:3500/cafe');

	return (
		<div id="cafe" className='flex flex-col items-center justify-center p-4'>
			<h1 className='mt-6 mb-6 text-3xl font-medium text-center'>Cafe</h1>
			<div className="grid grid-cols-3 items-center justify-center gap-4">
				{data.map((cafe) => (
					<Link to={`menu/${cafe.cafe_id}`} key={cafe.cafe_id}>
						<div className="card flex items-center justify-center max-w-fit max-h-max m-auto transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105">
							<img src={`http://localhost:3500/images/${cafe.cafe_image_url}`} alt="" className="rounded-t-3xl  max-w-full h-52" />
							<div className="card-body min-w-full bg-white rounded-b-3xl flex justify-center items-center flex-col p-4">
								<h3 className="card-title">{cafe.cafe_name}</h3>
								<p className="text-sm font-thin">{cafe.description}</p>
								<p className="font-medium">{cafe.cafe_location}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CafeFeed;
