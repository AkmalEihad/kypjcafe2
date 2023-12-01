import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import InProgress from "../features/Order/InProgress";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";
import CancelOrder from "../features/Cancel Order/CancelOrder";
import ExpiredSession from "../features/ExpiredSession/ExpiredSession";
import Confirm from "../features/Confirm/Confirm";

const Layout = () => {
	const location = useLocation();
	const customer_id = Cookies.get("customer_id");
	const { data } = useFetch(`http://localhost:3500/order/pending/${customer_id}`);
	const hasOrders = data.length > 0;
	Cookies.set("has_orders", hasOrders ? true : false);
	const progresss = Cookies.get("progress") === "true";
	const hasOrder = Cookies.get("has_orders") === "true";
	const inProgressPage = location.pathname.includes("/welcome/order/");
	const inProgressPage1 = location.pathname.includes("/welcome/orderPending/");
	const [showCancelPopup, setShowCancelPopup] = useState(null);
	const [showProgress, setShowProgress] = useState(null);
	const [refreshedOnce, setRefreshedOnce] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const cancel = Cookies.get("cancel") === "true";
	const confirmOrder = Cookies.get("confirm_order") === "true";

	console.log(refreshedOnce);

	useEffect(() => {
		if (hasOrder && !refreshedOnce) {
			setShowProgress(true);

			const timer = setTimeout(() => {
				window.location.reload();
				setRefreshedOnce(true);
			}, 2000000);

			return () => clearTimeout(timer);
		} else {
			setShowProgress(false);
		}
	}, [hasOrder, refreshedOnce]);

	useEffect(() => {
		if (confirmOrder) {
			setConfirm(true);

			const timerr = setTimeout(() => {
				setConfirm(false);
				Cookies.set("confirm_order", false);
				window.location.reload();
			}, 2000);

			return () => clearTimeout(timerr);
		}
	}, [confirmOrder]);

	useEffect(() => {
		if (cancel) {
			setShowCancelPopup(true);

			const timer = setTimeout(() => {
				setShowCancelPopup(false);
				Cookies.remove("cancel");
				Cookies.set("cancel", false);
				window.location.reload();
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [cancel]);

	return (
		<div className="min-h-screen text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
			{showCancelPopup && <CancelOrder />}
			{confirm && <Confirm />}
			{customer_id ? <Outlet /> : <ExpiredSession />}

			{inProgressPage ? null : inProgressPage1 ? null : showProgress && <InProgress />}

			<hr className="border-slate-800" />
			<Footer />
		</div>
	);
};

export default Layout;
