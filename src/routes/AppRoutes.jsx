import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
