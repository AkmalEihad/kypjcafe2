import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

const InProgress = () => {
	const customer_id = Cookies.get("customer_id");
	return (
		<Link to={`/welcome/orderPending/${customer_id}`}>
			<div className="toast toast-start">
				<div className="alert alert-info">
					<h1>Your Order is in progress</h1>
				</div>
			</div>
		</Link>
	);
};

export default InProgress;
