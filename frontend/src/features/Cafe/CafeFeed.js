import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const CafeFeed = () => {
	const { data } = useFetch('http://localhost:3500/cafe');

	return (
		<div id="cafe" className='flex flex-col items-center justify-center p-4'>
			<h1 className='mt-6 mb-6 text-3xl font-medium text-center'>Cafe</h1>
			<div className="flex items-center justify-center gap-3">
				{data.map((cafe) => (
					<Link to={`menu/${cafe.cafe_id}`} key={cafe.cafe_id}>
						<div className="flex items-center justify-center transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105">
							<img src={cafe.cafe_image_url} alt="" className="rounded-l-3xl w-52" />
							<div className="bg-white rounded-r-3xl h-[155px] flex justify-center items-center flex-col p-4">
								<h3 className="text-2xl font-bold">{cafe.cafe_name}</h3>
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
