import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Welcome from "./features/welcome/Welcome";
import MenuFeed from "./features/Menu/MenuFeed";
import ConfirmOrder from "./features/Order/ConfirmOrder";
import CancelOrder from "./features/Cancel Order/CancelOrder";
import Profile from "./features/Profile/Profile";
import ChangeProfile from "./features/Profile/ChangeProfile";
import OrderHistory from "./features/Order/OrderHistory";
import OrderHistoryDetail from "./features/Order/OrderHistoryDetail";
import MenuNav from "./features/Menu/MenuNav";
import OrderPending from "./features/Order/OrderPending";
import Missing from "./features/Missing/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/welcome" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="menu/:cafe_id" element={<MenuNav />} />

        <Route path="order/:order_id" element={<ConfirmOrder />} />
        <Route path="orderPending/:customer_id" element={<OrderPending />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-profile" element={<ChangeProfile />} />
        <Route path="recentOrder" element={<OrderHistory />} />
        <Route path="recentOrder/:order_id" element={<OrderHistoryDetail />} />
      </Route>
      <Route path="*" element={<Missing/>}/>
    </Routes>
  );
}

export default App;
