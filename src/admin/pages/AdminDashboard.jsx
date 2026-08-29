import { useEffect, useState } from "react";
import { Image, Package, Users, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

import { loadArtworks } from "../../data/artworks";
import { loadOrders } from "../../data/orders";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { getAllUsers } = useAuth();

  const [artworks, setArtworks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setArtworks(loadArtworks());
    setOrders(loadOrders());
    setUsers(getAllUsers());
  }, []);

  const revenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const stats = [
    {
      label: "Total Artworks",
      value: artworks.length,
      icon: Image,
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
    },
    {
      label: "Registered Users",
      value: users.length,
      icon: Users,
    },
    {
      label: "Total Sales",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your store's performance.</p>
        </div>
      </div>

      <div className="admin-stats-grid">

        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.label}>

            <div className="admin-stat-icon">
              <stat.icon size={20} />
            </div>

            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>

          </div>
        ))}

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">
          <h2>Recent Orders</h2>
          <Link to="/admin/orders">View all</Link>
        </div>

        {recentOrders.length === 0 ? (

          <p className="admin-empty">
            No orders placed yet. Sales will show
            up here as soon as customers check out.
          </p>

        ) : (

          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`status-badge status-${order.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;
