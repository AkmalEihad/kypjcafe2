import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Welcome from "./features/welcome/Welcome";
import MenuFeed from "./features/Menu/MenuFeed";
import ConfirmOrder from "./features/Order/ConfirmOrder";
import CancelOrder from "./features/Cancel Order/CancelOrder";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/welcome" element={<Layout/>}>
        <Route index element={<Welcome/>}/>
        <Route path="menu/:cafe_id" element={<MenuFeed/>}/>
      </Route>
      <Route path="order/:order_id" element={<ConfirmOrder/>}/>
      <Route path="cancelOrder" element={<CancelOrder/>}/>
        

    </Routes>
  );
}

export default App;
