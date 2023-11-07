import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import InProgress from "../features/Order/InProgress";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";

const Layout = () => {
	const location = useLocation();
  const customer_id = Cookies.get('customer_id')
	const { data } = useFetch(`http://localhost:3500/order/pending/${customer_id}`);
	const hasOrders = data.length > 0;
	Cookies.set("has_orders", hasOrders ? true : false);
	const progresss = Cookies.get("progress") === "true";
	const hasOrder = Cookies.get("has_orders") === "true";
	const inProgressPage = location.pathname.includes("/welcome/order/");
	const inProgressPage1 = location.pathname.includes("/welcome/orderPending/");

	console.log(progresss);
	return (
		<div className="min-h-screen text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
			<Outlet />
			{inProgressPage ? null : inProgressPage1 ? null : hasOrder ? <InProgress /> : null}

			<hr className="border-slate-800" />
			<Footer />
		</div>
	);
};

export default Layout;
