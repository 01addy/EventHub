import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const guestUser = sessionStorage.getItem("guest");
  const location = useLocation();

  if (!token && (!guestUser || location.pathname === "/create-event")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
