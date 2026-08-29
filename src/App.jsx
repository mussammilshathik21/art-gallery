import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ArtworkDetails from "./pages/ArtworkDetails";
import CreateYourArt from "./pages/CreateYourArt";

import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminContent from "./admin/pages/AdminContent";

/*
  The admin dashboard has its own layout (sidebar,
  no site Navbar), so routing is split into two
  branches based on the current path.
*/

function StoreRoutes() {
  return (
    <>
      {/* Navbar appears on every storefront page */}
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/artwork/:id"
          element={<ArtworkDetails />}
        />

        <Route
          path="/create-art"
          element={<CreateYourArt />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="content" element={<AdminContent />} />
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? <AdminRoutes /> : <StoreRoutes />;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
