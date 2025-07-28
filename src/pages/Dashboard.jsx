import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/loader.css";

import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false); // ⬅️ Loader state

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", icon: "bi-house-door-fill", path: "/dashboard/home" },
    { label: "Users", icon: "bi-people-fill", path: "/dashboard/users" },
    { label: "Diamond", icon: "bi-gem", path: "/dashboard/diamonds" },
    { label: "Quotations", icon: "bi-file-earmark-text-fill", path: "/dashboard/quotations" },

    { label: "Orders", icon: "bi-cart-fill", path: "/dashboard/orders" },
    // { label: "Settings", icon: "bi-gear-fill", path: "/dashboard/settings" },
  ];

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true); // ⬅️ Show loader
      try {
        const res = await fetch("http://62.72.33.172:4000/api/order/summary");
        const data = await res.json();
        if (data.status) {
          setSummary(data.data);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
      setLoading(false); // ⬅️ Hide loader
    };

    fetchSummary();
  }, []);

  const getCurrentMenu = () => {
    const current = menuItems.find((item) => location.pathname.includes(item.path));
    return current ? current.label : "Home";
  };

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
              className={`menu-item ${location.pathname.includes(item.path) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
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
          <h1>{getCurrentMenu()}</h1>
          <i className="bi bi-gear-fill"></i>
        </div>

        {/* <p>
          Welcome to the <strong>{getCurrentMenu()}</strong> section.
        </p> */}

        {location.pathname === "/dashboard/home" && (
          <>
            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              summary && (
                <div className="card-grid">
                  <div className="dashboard-card users">
                    <div className="icon"><i className="bi bi-people-fill"></i></div>
                    <div className="details">
                      <h3>{summary.totalUsers}</h3>
                      <p>Total Users</p>
                    </div>
                  </div>

                  <div className="dashboard-card orders">
                    <div className="icon"><i className="bi bi-cart-fill"></i></div>
                    <div className="details">
                      <h3>{summary.totalOrders}</h3>
                      <p>Total Orders</p>
                    </div>
                  </div>

                  <div className="dashboard-card quotations">
                    <div className="icon"><i className="bi bi-file-earmark-text-fill"></i></div>
                    <div className="details">
                      <h3>{summary.totalQuotations}</h3>
                      <p>Total Quotations</p>
                    </div>
                  </div>

                  <div className="dashboard-card pending">
                    <div className="icon"><i className="bi bi-hourglass-split"></i></div>
                    <div className="details">
                      <h3>{summary.orderStatusCounts.pending}</h3>
                      <p>Pending Orders</p>
                    </div>
                  </div>

                  <div className="dashboard-card confirmed">
                    <div className="icon"><i className="bi bi-patch-check-fill"></i></div>
                    <div className="details">
                      <h3>{summary.orderStatusCounts.confirmed}</h3>
                      <p>Confirmed Orders</p>
                    </div>
                  </div>

                  <div className="dashboard-card shipped">
                    <div className="icon"><i className="bi bi-truck"></i></div>
                    <div className="details">
                      <h3>{summary.orderStatusCounts.shipped}</h3>
                      <p>Shipped Orders</p>
                    </div>
                  </div>

                  <div className="dashboard-card delivered">
                    <div className="icon"><i className="bi bi-box-seam"></i></div>
                    <div className="details">
                      <h3>{summary.orderStatusCounts.delivered}</h3>
                      <p>Delivered Orders</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
