import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CafeFeed = () => {
	const { data } = useFetch('http://localhost:3500/cafe');

	return (
		<div id="cafe" className='flex flex-col items-center justify-center p-4'>
			<h1 className='mt-6 mb-6 text-3xl font-medium text-center text-white'>Cafe</h1>
			<div className="grid items-center justify-center max-w-4xl grid-cols-3 gap-4 min-w-3xl">
				{data.map((cafe) => (
					<Link to={`menu/${cafe.cafe_id}`} key={cafe.cafe_id}>
						<div className="flex items-center justify-center m-auto transition duration-300 ease-in-out card max-w-fit max-h-max delay-60 hover:-translate-y-1 hover:scale-105">
							<img src={`http://localhost:3500/images/${cafe.cafe_image_url}`} alt="" className="max-w-full rounded-t-3xl h-52" />
							<div className="flex flex-col items-center justify-center min-w-full p-4 bg-white card-body rounded-b-3xl">
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
