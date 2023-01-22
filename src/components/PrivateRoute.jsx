import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();

  // if(loading){
  //   return loading spinner
  // }

  // If logged in return child element inside private Route
  return loggedIn ? <Outlet /> : <Navigate to="/signIn" />;
}

export default PrivateRoute;
