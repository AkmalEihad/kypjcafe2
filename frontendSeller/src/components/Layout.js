import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Cookies from "js-cookie";
import CancelOrder from "../features/Cancel Order/CancelOrder";
import ExpiredSession from "../features/ExpiredSession/ExpiredSession";
import Confirm from "../features/Confirm/Confirm";

const Layout = () => {
	const [showCancelPopup, setShowCancelPopup] = useState(null);
	const [confirm, setConfirm] = useState(false);
	const seller_id = Cookies.get("seller_id");
	const cancel = Cookies.get("cancel") === "true";
	const confirmOrder = Cookies.get("confirm_order") === "true";

	useEffect(() => {
		if (cancel) {
			// Display the cancel pop-up for 3 seconds when the component mounts
			setShowCancelPopup(true);

			const timer = setTimeout(() => {
				setShowCancelPopup((prevShowCancelPopup) => {
					console.log(prevShowCancelPopup);
					return false;
				});
				Cookies.remove("cancel");
				Cookies.set("cancel", false);
			}, 3000);

			return () => clearTimeout(timer);
		} else {
			console.log("Cancel Error!");
		}
	}, [cancel]);

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

	return (
		<div className="min-h-screen text-black font-Rubik bg-gradient-to-r  from-slate-200 to-slate-500">
			{showCancelPopup && <CancelOrder />}
			{confirm && <Confirm />}
			{seller_id ? <Outlet /> : <ExpiredSession />}
			<hr className="border-slate-800" />
			<Footer />
		</div>
	);
};

export default Layout;
