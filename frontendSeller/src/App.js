import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginSeller from "./features/auth/LoginSeller";
import SignUpSeller from "./features/auth/SignUpSeller";
import Welcome from "./features/welcome/Welcome";
import Profile from "./features/Profile/Profile";
import ChangeProfile from "./features/Profile/ChangeProfile";
import OrderDetail from "./features/Order/OrderDetail";
import OrderHistory from "./features/Order/OrderHistory";
import OrderHistoryDetail from "./features/Order/OrderHistoryDetail";
import Cafe from "./features/Cafe/Cafe";
import CreateCafe from "./features/Cafe/CreateCafe";
import Menu from "./features/Menu/Menu";
import UpdateMenu from "./features/Menu/UpdateMenu";
import CreateMenu from "./features/Menu/CreateMenu";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSeller />} />
      <Route path="/signup" element={<SignUpSeller />} />

      <Route path="/welcome" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="order/:order_id" element={<OrderDetail />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/change-profile" element={<ChangeProfile />} />
      <Route path="/recentOrder" element={<OrderHistory />}/>
      <Route path="/recentOrder/:order_id" element={<OrderHistoryDetail />}/>
      <Route path="/create-cafe" element={<CreateCafe />}/>
      <Route path="/cafe/cafeDetail" element={<Cafe />}/>
      <Route path="/menu" element={<Menu />}/>
      <Route path="/menu/edit/:item_id" element={<UpdateMenu />}/>
      <Route path="/menu/create-menu" element={<CreateMenu />}/>
      
    </Routes>
  );
}

export default App;
