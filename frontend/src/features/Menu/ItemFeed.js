import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ItemFeed = ({ setSelectedCategory, selectedCategory }) => {
  const [cart, setCart] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { cafe_id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3500/menu/customerMenu/${cafe_id}`
  );
  console.log(data);

  // Filter items that are available and match the selected category
  const availableItems = data.filter(
    (item) =>
      item.is_available &&
      (selectedCategory === null ||
        selectedCategory === "All" ||
        item.categories === selectedCategory)
  );
  console.log(availableItems);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There Is No Item Yet In This Cafe</div>;
  }

  // Function to add an item to the cart
  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      existingItem.quantity++;
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItem) {
      existingItem.quantity++;
      setCart(updatedCart);
    }
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      setCart(updatedCart);
    } else if (existingItem && existingItem.quantity === 1) {
      // If quantity reaches 1, remove the item from the cart
      const filteredCart = updatedCart.filter(
        (cartItem) => cartItem.item_id !== item.item_id
      );
      setCart(filteredCart);
    }
  };

  const confirmOrder = async (e) => {
    const items = cart.map((item) => ({
      item_id: item.item_id,
      quantity: item.quantity,
    }));

    // Get the customer ID from the cookie
    const customer_id = Cookies.get("customer_id");
    // Prepare the order data to send to the server
    const createOrder = {
      customer_id,
    };

    if (items.length > 0) {
      try {
        // Send a POST request to create the order
        const response = await fetch("http://localhost:3500/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createOrder),
        });

        // Handle the response (success or error) as needed
        if (response.ok) {
          // Order created successfully
          Cookies.set("has_orders", true);

          const customerData = await response.json();
          console.log(customerData);
          const orderId = customerData.order[customerData.order.length - 1];
          const order_id = orderId.order_id;

          const dataForConfrimOrder = {
            order_id,
            items,
          };

          console.log(dataForConfrimOrder);

          const response1 = await fetch(
            "http://localhost:3500/order/confirmOrder",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataForConfrimOrder),
            }
          );

          // Navigate to the order page with the order details as query parameters
          Cookies.set("confirm_order", true);
          navigate(`/welcome/order/${order_id}`);
          window.location.reload();
        } else {
          // Handle the error response
          console.error("Order creation failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      setErrMsg("Your Cart Is Empty");
      console.log("Your Cart Is Empty");
    }
  };

  return (
    <div>
      {availableItems.length > 0 ? (
        <div className="flex justify-center items-start">
          <div className=" flex justify-center items-center gap-4 p-4 max-w-full max-h-full font-Rubik antialiased">
            {availableItems.map((item) => (
              <div
                key={item.item_id}
                className="px-3 py-3 mt-4 font-medium text-white bg-gradient-to-r  from-slate-400 to-slate-500 rounded-3xl drop-shadow-lg"
              >
                <img
                  src={`http://localhost:3500/images/${item.item_image_url}`}
                  alt=""
                  className="rounded-2xl w-52 max-h-[116px] m-auto"
                />
                <div className="flex justify-between items-center">
                  <p>{item.item_name}</p>
                  <p>{item.price}</p>
                </div>
                <button
                  className="px-4 py-2 mt-4 font-medium text-white transition duration-300 ease-in-out delay-60 bg-slate-600 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r  from-slate-600 to-slate-800 rounded-3xl drop-shadow-lg"
                  onClick={() => addToCart(item)}
                >
                  Add Cart
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-start items-start text-xl p-6">
            {errMsg && <p className="text-red-500 text-sm ml-2">{errMsg}</p>}
            <h2 className="mt-4 font-medium text-white text-2xl">
              Shopping Cart
            </h2>
            {cart.map(
              (cartItem) =>
                cartItem.quantity > 0 && ( // Only render if quantity is greater than 0
                  <div
                    key={cartItem.item_id}
                    className="flex flex-col justify-start text-white mx-2items-start"
                  >
                    <p>{cartItem.item_name}</p>
                    <p>Quantity: {cartItem.quantity}</p>
                    {/* Quantity adjustment buttons */}
                    <div className="">
                      <button
                        className="mr-2 text-center w-8 h-8 font-medium text-white hover:bg-green-600 transition duration-300 ease-in-out delay-60 bg-[#6859ea] rounded-3xl drop-shadow-lg"
                        onClick={() => increaseQuantity(cartItem)}
                      >
                        +
                      </button>
                      <button
                        className="text-center w-8 h-8 font-medium text-white hover:bg-red-600 transition duration-300 ease-in-out delay-60 bg-[#6859ea] rounded-3xl drop-shadow-lg"
                        onClick={() => decreaseQuantity(cartItem)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                )
            )}
            <button
              className="px-5 py-2 mt-4 font-medium text-white font-Rubik transition duration-300 ease-in-out delay-60 hover:-translate-y-1 hover:scale-105 bg-[#6859ea] hover:bg-gradient-to-r from-[#6859ea] to-[#6acbe0] rounded-3xl drop-shadow-lg"
              onClick={confirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      ) : (
        <p>There Is No Item Available Right Now</p>
      )}
    </div>
  );
};

export default ItemFeed;
