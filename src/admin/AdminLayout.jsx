import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Package,
  Users,
  Palette,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "./admin.css";

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-shell">


      {/* ================================
          MOBILE TOP BAR
      ================================= */}

      <div className="admin-mobile-bar">

        <button
          className="admin-menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <span className="admin-mobile-brand">
          ARTS <em>GALLERY</em>
        </span>

      </div>


      {/* ================================
          BACKDROP (mobile only)
      ================================= */}

      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={closeSidebar}
        />
      )}


      {/* ================================
          SIDEBAR
      ================================= */}

      <aside
        className={
          sidebarOpen
            ? "admin-sidebar open"
            : "admin-sidebar"
        }
      >

        <div className="admin-sidebar-top">

          <div className="admin-brand">
            ARTS <span>GALLERY</span>
          </div>

          <button
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

        </div>

        <nav
          className="admin-nav"
          key={location.pathname}
        >

          <NavLink to="/admin" end onClick={closeSidebar}>
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" onClick={closeSidebar}>
            <Image size={17} />
            Products
          </NavLink>

          <NavLink to="/admin/orders" onClick={closeSidebar}>
            <Package size={17} />
            Orders
          </NavLink>

          <NavLink to="/admin/users" onClick={closeSidebar}>
            <Users size={17} />
            Users
          </NavLink>

          <NavLink to="/admin/content" onClick={closeSidebar}>
            <Palette size={17} />
            Site Content
          </NavLink>

        </nav>

        <div className="admin-sidebar-bottom">

          <button
            className="admin-back-store"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={15} />
            Back to Store
          </button>

          <div className="admin-user">

            <div className="admin-avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="admin-user-info">
              <strong>{user?.name}</strong>
              <span>{user?.email}</span>
            </div>

          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={15} />
            Logout
          </button>

        </div>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
