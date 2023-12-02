import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header";

const OrderHistoryDetail = () => {
  const navigate = useNavigate();
  const { order_id } = useParams();
  const { data } = useFetch(
    `http://localhost:3500/order/orderReceipt/${order_id}`
  );

  const isoDateString = data.length > 0 ? data[0].order_date : null;
  let formattedDate = "No order date found";

  if (isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    formattedDate = date.toLocaleDateString("en-US", options);
  }

  // Calculate total price
  let totalPrice = 0;
  data.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
      <Header />

      <div className="flex flex-col mb-10 justify-center text-black font-Rubik items-center gap-10">
        <h1 className="mt-10 flex text-3xl justify-center text-white font-Rubik items-center gap-10">
          Your Order Detail
        </h1>
        <div className="flex text-xl justify-center text-white font-Rubik items-center gap-2">
          <h2>Your number is </h2>
          <p>{data.length > 0 ? data[0].order_id : "No order ID found"}</p>
        </div>
        <div className="min-w-full">
          <div className="max-w-xl m-auto rounded-lg bg-white p-4 transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
            {data.map((i) => (
              <div key={i.order_item_id}>
                <p>{i.item_name}</p>
                <div className="flex justify-between gap-4">
                  <p>Qty: {i.quantity}</p>
                  <p>RM{i.price * i.quantity}</p>
                </div>
                <hr />
              </div>
            ))}
            <br />
            <p className="font-bold text-lg">Total Price: RM{totalPrice}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetail;
