import { useEffect, useState } from "react";

import { loadOrders, updateOrderStatus, ORDER_STEPS } from "../../data/orders";

const STATUSES = [...ORDER_STEPS, "Cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders(updateOrderStatus(id, status));
  };

  return (
    <div className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>Orders</h1>
          <p>View every order placed and update its status.</p>
        </div>
      </div>

      <div className="admin-panel">

        {orders.length === 0 ? (

          <p className="admin-empty">
            No orders placed yet.
          </p>

        ) : (

          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <span className="admin-subtext">
                      {order.customerEmail}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items.length}</td>
                  <td>
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        handleStatusChange(order.id, event.target.value)
                      }
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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

export default AdminOrders;
