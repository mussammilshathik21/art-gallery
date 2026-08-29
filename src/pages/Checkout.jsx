import { useState } from "react";
import {
  Lock,
  CreditCard,
  Banknote,
  ArrowLeft,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addOrder, generateOrderId } from "../data/orders";

import "../css/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    items: cartItems,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    state: "",
    pincode: "",
  });


  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =========================================
     PLACE ORDER
  ========================================= */

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const order = {
      id: generateOrderId(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Placed",
      paymentMethod,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      items: cartItems,
      subtotal,
      shipping,
      total,
    };

    addOrder(order);
    clearCart();

    setOrderPlaced(true);
  };


  /* =========================================
     EMPTY CART GUARD
  ========================================= */

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">

        <div className="checkout-success">

          <div className="checkout-success-icon">
            <ShoppingBag size={30} />
          </div>

          <span>
            YOUR CART IS EMPTY
          </span>

          <h1>
            Nothing to check out yet.
          </h1>

          <p>
            Add an artwork to your cart before
            heading to checkout.
          </p>

          <div className="checkout-success-actions">

            <button
              onClick={() =>
                navigate("/gallery")
              }
            >
              Explore Gallery
            </button>

          </div>

        </div>

      </main>
    );
  }


  /* =========================================
     ORDER SUCCESS
  ========================================= */

  if (orderPlaced) {
    return (
      <main className="checkout-page">

        <div className="checkout-success">

          <div className="checkout-success-icon">
            <Check size={30} />
          </div>

          <span>
            ORDER CONFIRMED
          </span>

          <h1>
            Thank you for your order.
          </h1>

          <p>
            Your artwork has been successfully
            ordered. We will contact you with
            delivery updates.
          </p>

          <div className="checkout-success-actions">

            <button
              onClick={() =>
                navigate("/orders")
              }
            >
              View Orders
            </button>

            <button
              className="success-secondary"
              onClick={() =>
                navigate("/gallery")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </main>
    );
  }


  return (
    <main className="checkout-page">

      <div className="checkout-container">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="checkout-header">

          <button
            className="checkout-back"
            onClick={() =>
              navigate("/cart")
            }
          >
            <ArrowLeft size={15} />

            Back to Cart
          </button>

          <span>
            SECURE CHECKOUT
          </span>

          <h1>
            Checkout
          </h1>

        </div>


        <form
          className="checkout-layout"
          onSubmit={handlePlaceOrder}
        >


          {/* =================================
              CUSTOMER DETAILS
          ================================== */}

          <section className="checkout-form">


            <div className="checkout-section">

              <div className="section-heading">

                <span>
                  01
                </span>

                <div>
                  <h2>
                    Contact Information
                  </h2>

                  <p>
                    Where should we send your
                    order confirmation?
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                </div>


                <div className="form-group full-width">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />

                </div>

              </div>

            </div>


            {/* =================================
                ADDRESS
            ================================== */}

            <div className="checkout-section">

              <div className="section-heading">

                <span>
                  02
                </span>

                <div>
                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Where should we deliver your
                    artwork?
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat number, Street, Area"
                    rows="3"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6 digit PIN"
                    maxLength="6"
                    required
                  />

                </div>

              </div>

            </div>


            {/* =================================
                PAYMENT
            ================================== */}

            <div className="checkout-section">

              <div className="section-heading">

                <span>
                  03
                </span>

                <div>
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose your preferred payment
                    method.
                  </p>
                </div>

              </div>


              <div className="payment-options">


                {/* CARD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "card"
                      ? "payment-selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={() =>
                      setPaymentMethod("card")
                    }
                  />

                  <CreditCard size={18} />

                  <div>
                    <strong>
                      Card Payment
                    </strong>

                    <span>
                      Credit or Debit Card
                    </span>
                  </div>

                </label>


                {/* COD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "cod"
                      ? "payment-selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={() =>
                      setPaymentMethod("cod")
                    }
                  />

                  <Banknote size={18} />

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your artwork arrives
                    </span>
                  </div>

                </label>

              </div>


              {/* CARD DETAILS */}

              {paymentMethod === "card" && (

                <div className="card-details">

                  <div className="form-group">

                    <label>
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />

                  </div>


                  <div className="card-small-fields">

                    <div className="form-group">

                      <label>
                        Expiry
                      </label>

                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength="5"
                      />

                    </div>


                    <div className="form-group">

                      <label>
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="•••"
                        maxLength="3"
                      />

                    </div>

                  </div>

                </div>

              )}

            </div>

          </section>


          {/* =================================
              ORDER SUMMARY
          ================================== */}

          <aside className="checkout-summary">

            <div className="summary-top">

              <span>
                YOUR ORDER
              </span>

              <h2>
                Order Summary
              </h2>

            </div>


            <div className="checkout-products">

              {cartItems.map((item) => (

                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <span>
                      Qty: {item.quantity}
                    </span>

                  </div>

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              ))}

            </div>


            <div className="checkout-summary-lines">

              <div>
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>


              <div>
                <span>
                  Shipping
                </span>

                <strong>
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping}`}
                </strong>
              </div>

            </div>


            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <button
              type="submit"
              className="place-order-button"
            >
              <Lock size={14} />

              Place Order

            </button>


            <p className="secure-note">
              Your information is protected
              and securely processed.
            </p>

          </aside>

        </form>

      </div>

    </main>
  );
}

export default Checkout;