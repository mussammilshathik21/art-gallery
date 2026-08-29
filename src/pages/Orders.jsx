import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  ArrowRight,
  ShoppingBag,
  ChevronDown,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../data/orders";
import OrderTracker from "../components/OrderTracker";

import "../css/Orders.css";

function Orders() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setOrders(getOrdersForUser(user.email));
    } else {
      setOrders([]);
    }
  }, [user]);


  /* =========================================
     LOGIN REQUIRED
  ========================================= */

  if (!isAuthenticated) {
    return (
      <main className="orders-page">

        <div className="orders-container">

          <div className="empty-orders">

            <div className="empty-orders-icon">
              <Package size={30} />
            </div>

            <h2>
              Sign in to see your orders
            </h2>

            <p>
              Your artwork purchases and delivery
              tracking will appear here once
              you're logged in.
            </p>

            <button
              onClick={() =>
                navigate("/login", {
                  state: { from: "/orders" },
                })
              }
            >
              Login

              <ArrowRight size={15} />
            </button>

          </div>

        </div>

      </main>
    );
  }


  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };


  const toggleTracking = (orderId) => {
    setExpandedId((previous) =>
      previous === orderId ? null : orderId
    );
  };


  return (
    <main className="orders-page">

      <div className="orders-container">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="orders-header">

          <span className="orders-label">
            YOUR PURCHASES
          </span>

          <h1>
            Order History
          </h1>

          <p>
            Every artwork you've ordered, along
            with live delivery tracking.
          </p>

        </div>


        {/* =====================================
            EMPTY ORDERS
        ====================================== */}

        {orders.length === 0 ? (

          <div className="empty-orders">

            <div className="empty-orders-icon">
              <Package size={30} />
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              Your artwork purchases will
              appear here.
            </p>

            <button
              onClick={() =>
                navigate("/gallery")
              }
            >
              Explore Gallery

              <ArrowRight size={15} />
            </button>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => {

              const isExpanded = expandedId === order.id;

              return (

                <article
                  className="order-card"
                  key={order.id}
                >


                  {/* =================================
                      ORDER HEADER
                  ================================== */}

                  <div className="order-top">

                    <div>

                      <span>
                        ORDER
                      </span>

                      <h2>
                        {order.id}
                      </h2>

                    </div>


                    <div className="order-date">

                      <span>
                        ORDER DATE
                      </span>

                      <strong>
                        {order.date}
                      </strong>

                    </div>


                    <div
                      className={`order-status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </div>

                  </div>


                  {/* =================================
                      ORDER ITEMS
                  ================================== */}

                  <div className="order-items">

                    {order.items.map((item) => (

                      <div
                        className="order-item"
                        key={item.id}
                      >

                        <div className="order-item-image">

                          <img
                            src={item.image}
                            alt={item.title}
                          />

                        </div>


                        <div className="order-item-info">

                          <span>
                            ORIGINAL ARTWORK
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                          <p>
                            By {item.artist}
                          </p>

                          <small>
                            Quantity:{" "}
                            {item.quantity}
                          </small>

                        </div>


                        <strong className="order-item-price">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    ))}

                  </div>


                  {/* =================================
                      TRACK ORDER TOGGLE
                  ================================== */}

                  <button
                    className={
                      "order-track-toggle" +
                      (isExpanded ? " open" : "")
                    }
                    onClick={() =>
                      toggleTracking(order.id)
                    }
                  >

                    <Truck size={15} />

                    {isExpanded
                      ? "Hide Tracking"
                      : "Track Order"}

                    <ChevronDown
                      size={15}
                      className="order-track-chevron"
                    />

                  </button>


                  {isExpanded && (

                    <div className="order-tracking">
                      <OrderTracker status={order.status} />
                    </div>

                  )}


                  {/* =================================
                      ORDER FOOTER
                  ================================== */}

                  <div className="order-bottom">

                    <div className="order-delivery">

                      <MapPin size={14} />

                      <span>
                        Delivery to registered
                        address
                      </span>

                    </div>


                    <div className="order-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        ₹
                        {order.total.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

        )}


        {/* =====================================
            SHOPPING BUTTON
        ====================================== */}

        {orders.length > 0 && (

          <div className="orders-shopping">

            <ShoppingBag size={16} />

            <span>
              Looking for something new?
            </span>

            <button
              onClick={() =>
                navigate("/gallery")
              }
            >
              Explore Gallery

              <ArrowRight size={14} />
            </button>

          </div>

        )}

      </div>

    </main>
  );
}

export default Orders;
