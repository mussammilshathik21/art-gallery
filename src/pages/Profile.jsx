import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Edit3,
  Save,
  X,
  Package,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../data/orders";
import OrderTracker from "../components/OrderTracker";

import "../css/Profile.css";

function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();

  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [recentOrder, setRecentOrder] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const orders = getOrdersForUser(user.email);
      setRecentOrder(orders[0] || null);
    }
  }, [user]);


  /* =========================================
     LOGIN CHECK
  ========================================= */

  if (!isAuthenticated) {
    return (
      <main className="profile-login-page">

        <div className="profile-login-box">

          <div className="profile-login-icon">
            <User size={28} />
          </div>

          <h1>
            Your Profile
          </h1>

          <p>
            Please login or create an account
            to access your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="profile-login-button"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="profile-signup-button"
          >
            Create Account
          </button>

        </div>

      </main>
    );
  }


  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  /* =========================================
     SAVE PROFILE
  ========================================= */

  const handleSave = () => {

    /*
      Persisted through AuthContext, which keeps
      the account list and the active session in
      sync in localStorage.
    */

    updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    });

    setEditing(false);
  };


  /* =========================================
     CANCEL
  ========================================= */

  const handleCancel = () => {

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });

    setEditing(false);
  };


  return (

    <main className="profile-page">

      <section className="profile-container">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="profile-header">

          <div>

            <span className="profile-eyebrow">
              ARTS GALLERY / ACCOUNT
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information
              and delivery details.
            </p>

          </div>


          {!editing && (

            <button
              className="edit-profile-button"
              onClick={() =>
                setEditing(true)
              }
            >
              <Edit3 size={16} />

              Edit Profile
            </button>

          )}

        </div>


        {/* =====================================
            RECENT ORDER / DELIVERY TRACKING
        ====================================== */}

        <div className="order-tracking-card">

          <div className="order-tracking-card-header">

            <div className="order-tracking-card-title">
              <Package size={17} />
              <h2>
                {recentOrder ? "Recent Order" : "Order Tracking"}
              </h2>
            </div>

            <button
              className="view-history-button"
              onClick={() => navigate("/orders")}
            >
              View Order History
              <ArrowRight size={14} />
            </button>

          </div>

          {recentOrder ? (

            <>

              <div className="order-tracking-card-meta">

                <div>
                  <span>ORDER</span>
                  <strong>{recentOrder.id}</strong>
                </div>

                <div>
                  <span>PLACED ON</span>
                  <strong>{recentOrder.date}</strong>
                </div>

                <div>
                  <span>TOTAL</span>
                  <strong>
                    ₹{recentOrder.total.toLocaleString("en-IN")}
                  </strong>
                </div>

              </div>

              <OrderTracker status={recentOrder.status} />

            </>

          ) : (

            <p className="order-tracking-empty">
              You haven't placed an order yet. Once
              you do, you'll be able to track its
              delivery progress right here.
            </p>

          )}

        </div>


        {/* =====================================
            PROFILE CARD
        ====================================== */}

        <div className="profile-card">


          {/* PROFILE TOP */}

          <div className="profile-user">

            <div className="profile-avatar">
              {formData.name
                ? formData.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div>

              <h2>
                {formData.name ||
                  "Art Lover"}
              </h2>

              <p>
                {formData.email}
              </p>

            </div>

          </div>


          {/* =================================
              INFORMATION
          ================================= */}

          <div className="profile-information">


            {/* NAME */}

            <div className="profile-field">

              <label>
                <User size={15} />
                Full Name
              </label>

              {editing ? (

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

              ) : (

                <p>
                  {formData.name ||
                    "Not added"}
                </p>

              )}

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                <Mail size={15} />
                Email Address
              </label>

              <p>
                {formData.email ||
                  "Not available"}
              </p>

              {editing && (
                <small>
                  Email is managed by your
                  account authentication.
                </small>
              )}

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>
                <Phone size={15} />
                Phone Number
              </label>

              {editing ? (

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              ) : (

                <p>
                  {formData.phone ||
                    "Not added"}
                </p>

              )}

            </div>


            {/* ADDRESS */}

            <div className="profile-field profile-address">

              <label>
                <MapPin size={15} />
                Address
              </label>

              {editing ? (

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  rows="4"
                />

              ) : (

                <p>
                  {formData.address ||
                    "No address added"}
                </p>

              )}

            </div>

          </div>


          {/* =================================
              PASSWORD
          ================================= */}

          <div className="password-section">

            <div className="password-icon">
              <Lock size={18} />
            </div>

            <div>

              <h3>
                Password
              </h3>

              <p>
                Your password is securely
                protected.
              </p>

            </div>

            <button
              className="change-password-button"
              onClick={() =>
                alert(
                  "Change password feature will be added."
                )
              }
            >
              Change Password
            </button>

          </div>


          {/* =================================
              EDIT ACTIONS
          ================================= */}

          {editing && (

            <div className="profile-actions">

              <button
                className="cancel-profile"
                onClick={handleCancel}
              >
                <X size={16} />

                Cancel
              </button>

              <button
                className="save-profile"
                onClick={handleSave}
              >
                <Save size={16} />

                Save Changes
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Profile;