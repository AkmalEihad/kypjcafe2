import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const CafeFeed = () => {
	const { data } = useFetch('http://localhost:3500/cafe');

	return (
		<div id="cafe" className='flex flex-col justify-center items-center p-4'>
			<h1 className='font-medium text-center text-3xl'>Cafe</h1>
			<div className="flex justify-center items-center gap-4 ">
				{data.map((cafe) => (
					<Link to={`menu/${cafe.cafe_id}`} key={cafe.cafe_id}>
						<div className="flex justify-center items-center">
							<img src={cafe.cafe_image_url} alt="" className="w-52 rounded-l-lg" />
							<div className="bg-white rounded-r-lg h-[152px] flex justify-center items-center flex-col p-4">
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
