import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const OrderHistoryDetail = () => {
    const { order_id } = useParams();
    const { data } = useFetch(`http://localhost:3500/order/orderReceipt/${order_id}`);

    const isoDateString = data.length > 0 ? data[0].order_date : null;
    let formattedDate = 'No order date found';

    if (isoDateString) {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        formattedDate = date.toLocaleDateString('en-US', options);
    }

    // Calculate total price
    let totalPrice = 0;
    data.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    return (
        <div>
            <h1>Your Order Detail</h1>
            <div className="flex">
                <h2>Your number is </h2>
                <p>{data.length > 0 ? data[0].order_id : 'No order ID found'}</p>
            </div>
            <div>
                {data.map((i) => (
                    <div key={i.order_item_id}>
                        <div className="flex">
                            <p>{i.item_name} x </p>
                            <p>{i.quantity}</p>
                        </div>
                        <p>RM{i.price * i.quantity}</p>
                    </div>
                ))}
                <p>Total Price: RM{totalPrice}</p>
                <p>{formattedDate}</p>
            </div>
        </div>
    );
}

export default OrderHistoryDetail