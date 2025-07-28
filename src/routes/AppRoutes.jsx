import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import DiamondList from '../pages/Diamond/DiamondList';
import OrderList from "../pages/order/OrderList";
import QuotationList from "../pages/QuotationsPage";
import UserList from "../pages/UserList";




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/diamonds" element={<DiamondList />} />
        <Route path="/dashboard/orders" element={<OrderList />} />
                <Route path="/dashboard/quotations" element={<QuotationList />} />
                                <Route path="/dashboard/users" element={<UserList />} />




      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
