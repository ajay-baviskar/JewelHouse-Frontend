import { useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  const menuItems = [
    { label: "Home", icon: "bi-house-door-fill" },
    { label: "Users", icon: "bi-people-fill" },
    { label: "Orders", icon: "bi-cart-fill" },
    { label: "Quotations", icon: "bi-file-earmark-text-fill" },
    { label: "Settings", icon: "bi-gear-fill" },
  ];

  const stats = [
    { label: "Users", count: 1200, icon: "bi-people-fill", color: "#0e4c35" },
    { label: "Orders", count: 320, icon: "bi-cart-fill", color: "#ff6b6b" },
    { label: "Quotations", count: 150, icon: "bi-file-earmark-text-fill", color: "#3b82f6" },
  ];

  return (
    <div className="dashboard">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2>{collapsed ? "A" : "AdminLTE"}</h2>
          <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <i className={`bi ${collapsed ? "bi-chevron-double-right" : "bi-chevron-double-left"}`}></i>
          </button>
        </div>

        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={activeMenu === item.label ? "active" : ""}
              onClick={() => setActiveMenu(item.label)}
            >
              <i className={`bi ${item.icon}`}></i>
              {!collapsed && <span className="text">{item.label}</span>}
            </li>
          ))}

          <li
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            {!collapsed && <span className="text">Logout</span>}
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>{activeMenu}</h1>
            <i className="bi bi-gear-fill"></i> {/* Settings Icon */}

        </div>
        <p>Welcome to the <strong>{activeMenu}</strong> section.</p>

        {activeMenu === "Home" && (
          <div className="card-grid">
            {stats.map((stat) => (
              <div className="dashboard-card" key={stat.label} style={{ borderLeft: `5px solid ${stat.color}` }}>
                <div className="icon" style={{ color: stat.color }}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <div className="details">
                  <h3>{stat.count}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;