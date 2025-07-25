import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [summary, setSummary] = useState(null);

  const menuItems = [
    { label: "Home", icon: "bi-house-door-fill" },
    { label: "Users", icon: "bi-people-fill" },
    { label: "Orders", icon: "bi-cart-fill" },
    { label: "Quotations", icon: "bi-file-earmark-text-fill" },
    { label: "Settings", icon: "bi-gear-fill" },
  ];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("http://62.72.33.172:4000/api/order/summary");
        const data = await res.json();
        if (data.status) {
          setSummary(data.data);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchSummary();
  }, []);

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
          <i className="bi bi-gear-fill"></i>
        </div>

        <p>
          Welcome to the <strong>{activeMenu}</strong> section.
        </p>

        {activeMenu === "Home" && summary && (
          <div className="card-grid">
            <div className="dashboard-card users">
              <div className="icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="details">
                <h3>{summary.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div className="dashboard-card orders">
              <div className="icon">
                <i className="bi bi-cart-fill"></i>
              </div>
              <div className="details">
                <h3>{summary.totalOrders}</h3>
                <p>Total Orders</p>
              </div>
            </div>

            <div className="dashboard-card quotations">
              <div className="icon">
                <i className="bi bi-file-earmark-text-fill"></i>
              </div>
              <div className="details">
                <h3>{summary.totalQuotations}</h3>
                <p>Total Quotations</p>
              </div>
            </div>

            <div className="dashboard-card pending">
              <div className="icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
              <div className="details">
                <h3>{summary.orderStatusCounts.pending}</h3>
                <p>Pending Orders</p>
              </div>
            </div>

            <div className="dashboard-card confirmed">
              <div className="icon">
                <i className="bi bi-patch-check-fill"></i>
              </div>
              <div className="details">
                <h3>{summary.orderStatusCounts.confirmed}</h3>
                <p>Confirmed Orders</p>
              </div>
            </div>

            <div className="dashboard-card shipped">
              <div className="icon">
                <i className="bi bi-truck"></i>
              </div>
              <div className="details">
                <h3>{summary.orderStatusCounts.shipped}</h3>
                <p>Shipped Orders</p>
              </div>
            </div>

            <div className="dashboard-card delivered">
              <div className="icon">
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="details">
                <h3>{summary.orderStatusCounts.delivered}</h3>
                <p>Delivered Orders</p>
              </div>
            </div>
          </div>

        )}
      </main>
    </div>
  );
};

export default Dashboard;
