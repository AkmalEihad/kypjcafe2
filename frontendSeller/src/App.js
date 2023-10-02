import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginSeller from "./features/auth/LoginSeller";
import SignUpSeller from "./features/auth/SignUpSeller";
import Welcome from "./features/welcome/Welcome";
import MenuFeed from "./features/Menu/MenuFeed";
import CafeFeed from "./features/Cafe/CafeFeed"


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSeller/>}/>
      <Route path="/signup" element={<SignUpSeller/>}/>

      <Route path="/welcome" element={<Layout/>}>
        <Route index element={<Welcome/>}/>
        <Route path="menu/:cafe_id" element={<MenuFeed/>}/>
      </Route>
      <Route path="/CafeFeed" element={<CafeFeed/>}/>
    </Routes>
  );
}

export default App;
