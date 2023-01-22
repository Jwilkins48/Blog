import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus();

  // if (loading) {
  //   return loading icon
  // }

  return loggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;
