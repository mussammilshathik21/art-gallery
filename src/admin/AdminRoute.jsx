import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/*
  Guards every /admin route.
  - Not logged in -> send to login, remembering
    where they were headed.
  - Logged in but not an admin -> send home.
*/

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
