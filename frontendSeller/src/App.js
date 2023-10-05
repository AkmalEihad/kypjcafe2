import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginSeller from "./features/auth/LoginSeller";
import SignUpSeller from "./features/auth/SignUpSeller";
import Welcome from "./features/welcome/Welcome";
import MenuFeed from "./features/Menu/MenuFeed";
import Profile from "./features/Profile/Profile";
import ChangeProfile from "./features/Profile/ChangeProfile";
import OrderDetail from "./features/Order/OrderDetail";
import OrderHistory from "./features/Order/OrderHistory";
import OrderHistoryDetail from "./features/Order/OrderHistoryDetail";
import Cafe from "./features/Cafe/Cafe";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSeller />} />
      <Route path="/signup" element={<SignUpSeller />} />

      <Route path="/welcome" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="menu/:cafe_id" element={<MenuFeed />} />
        <Route path="order/:order_id" element={<OrderDetail />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/change-profile" element={<ChangeProfile />} />
      <Route path="/orderHistory" element={<OrderHistory />}/>
      <Route path="/orderHistory/:order_id" element={<OrderHistoryDetail />}/>
      <Route path="/cafe" element={<Cafe />}/>
      
    </Routes>
  );
}

export default App;
