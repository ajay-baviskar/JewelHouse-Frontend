import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import DiamondList from '../pages/Diamond/DiamondList';
import DiamondTable from "../components/DiamondTable";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/diamonds" element={<DiamondList />} />
        {/* <Route path="/diamonds" element={<DiamondTable />} /> */}


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
