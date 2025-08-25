import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Dashboard.css";
import '../styles/Sidebar.css';

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
const navigate = useNavigate();
   const menuItems = [
    { label: "Home", icon: "bi-house-door-fill", path: "/dashboard/home" },
    { label: "Users", icon: "bi-people-fill", path: "/dashboard/users" },
    { label: "Diamond", icon: "bi-gem", path: "/dashboard/diamonds" },
    { label: "Gold Rates", icon: "bi-currency-dollar", path: "/dashboard/gold" },
    { label: "Quotations", icon: "bi-file-earmark-text-fill", path: "/dashboard/quotations" },
    { label: "Orders", icon: "bi-cart-fill", path: "/dashboard/orders" },

    // { label: "Settings", icon: "bi-gear-fill", path: "/dashboard/settings" },
  ];

    return (
        <div className="dashboard">
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-header">
                    <h2>{collapsed ? "A" : "Admin"}</h2>
                    <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
                        <i className={`bi ${collapsed ? "bi-chevron-double-right" : "bi-chevron-double-left"}`}></i>
                    </button>
                </div>

                <ul className="menu">
                    {menuItems.map((item) => (
                        <li
                            key={item.label}
                            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                            onClick={() => navigate(item.path)} // Use navigate instead of Link
                        >
                            <i className={`bi ${item.icon}`}></i>
                            {!collapsed && <span className="text">{item.label}</span>}
                        </li>
                    ))}


                    <li className="logout" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}>
                        <i className="bi bi-box-arrow-right"></i>
                        {!collapsed && <span className="text">Logout</span>}
                    </li>
                </ul>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
