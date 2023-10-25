import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const CafeFeed = () => {
    const { data } = useFetch('http://localhost:3500/cafe');

    // Filter out cafes that are open
    const openCafes = data.filter((cafe) => cafe.is_open);

    return (
        <div id="cafe" className='flex flex-col items-center justify-center p-4'>
            <h1 className='mt-2 mb-3 text-3xl font-medium text-center text-white'>Cafe</h1>
            <div className="grid items-center justify-center  grid-cols-3 gap-4 min-w-2xl max-w-3xl">
                {openCafes.map((cafe) => (
                    <Link to={`menu/${cafe.cafe_id}`} key={cafe.cafe_id}>
                        <div className="flex items-center justify-center m-auto transition duration-300 ease-in-out card max-w-fit min-h-40 delay-60 hover:-translate-y-1 hover:scale-105">
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
