import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ItemFeed from "./ItemFeed";
import Header from "../../components/Header";

// ...

const MenuNav = () => {
	const { cafe_id } = useParams();
	const { data } = useFetch(`http://localhost:3500/menu/${cafe_id}`);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const uniqueCategories = ["All", ...new Set(data.map((item) => item.categories))];

	const handleClick = (category) => {
    if (category === "All") {
      setSelectedCategory(null); // Reset the selected category to null for displaying all items
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredData = selectedCategory ? data.filter((item) => item.categories === selectedCategory) : data;

	return (
		<div>
      <Header/>
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
	);
};

export default MenuNav;
