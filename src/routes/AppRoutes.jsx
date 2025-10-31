import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import DiamondList from "../pages/Diamond/DiamondList";
import OrderList from "../pages/order/OrderList";
import QuotationList from "../pages/QuotationsPage";
import UserList from "../pages/UserList";
import GoldList from "../pages/gold/GoldList";

import ProtectedRoute from "../components/ProtectedRoute"; // ✅ Import

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/portal" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/diamonds"
          element={
            <ProtectedRoute>
              <DiamondList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/quotations"
          element={
            <ProtectedRoute>
              <QuotationList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
  path="/dashboard/gold"
  element={
    <ProtectedRoute>
      <GoldList />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
