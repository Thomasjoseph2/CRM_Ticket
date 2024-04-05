import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
const PrivateRoute = () => {
  const { getUserInfo } = useUserContext();
  const userInfo = getUserInfo();
  // If userInfo is not defined or null, redirect to login, else render the nested routes
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
