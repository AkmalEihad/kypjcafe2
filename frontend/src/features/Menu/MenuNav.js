import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ItemFeed from "./ItemFeed";
import Header from "../../components/Header";
import { BsBasket } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";

// ...

const MenuNav = () => {
	const { cafe_id } = useParams();
	const { data } = useFetch(`http://localhost:3500/menu/customerMenu/${cafe_id}`);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const uniqueCategories = ["All", ...new Set(data.map((item) => item.is_available && item.categories))];

	const handleClick = (category) => {
		if (category === "All") {
			setSelectedCategory(null); // Reset the selected category to null for displaying all items
		} else {
			setSelectedCategory(category);
		}
	};
	console.log(data)

	const filteredData = selectedCategory ? data.filter((item) => item.categories === selectedCategory) : data;

	return (
		<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
            <Header />

			<div className="flex flex-col justify-center items-center">
				<div className="flex flex-col w-[400px] mb-6">
					<div className="flex justify-center items-center">
						<div className="flex justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<div className="w-14 h-14 rounded-full border-2 border-blue-300 flex justify-center items-center">
									<div className="bg-blue-300 w-12 h-12 rounded-full flex justify-center items-center">
										<BsBasket />
									</div>
								</div>
							</div>
							<hr className="border-2 w-24 m-auto border-blue-300" />
						</div>

						<div className="flex justify-center items-center">
							<div className="flex justify-center items-start">
								<div className="w-14 h-14 rounded-full border-2 border-gray-300 flex justify-center items-center">
									<div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
										<GrInProgress />
									</div>
								</div>
							</div>
							<hr className="border-2 w-24 m-auto border-gray-300" />
						</div>

						<div className="flex justify-center items-start">
							<div className="flex justify-center items-start">
								<div className="w-14 h-14 rounded-full border-2 border-gray-300 flex justify-center items-center">
									<div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
										<AiOutlineCheck />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-between text-white items-center">
						<p>Order Placed</p>
						<p>In Progress</p>
						<p>Completed</p>
					</div>
				</div>

				<h1 className="font-bold text-3xl">{data.length > 0 ? data[0].cafe_name : null}</h1>

				<nav className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg w-fit m-auto">
					<ul className="flex justify-center items-center gap-4 hover:cursor-pointer">
						{uniqueCategories.map((category, index) => (
							<li key={index} onClick={() => handleClick(category)} className={selectedCategory === category ? "font-bold" : ""}>
								{category}
							</li>
						))}
					</ul>
				</nav>
				<ItemFeed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} data={filteredData} />
			</div>
		</div>
	);
};

export default MenuNav;
