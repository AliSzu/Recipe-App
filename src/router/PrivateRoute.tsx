import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import Login from "../pages/Login";
import { selectIsLoggedIn } from "../slices/authSlice";
import { useAppSelector } from "../store/store";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : <Login />;
};

export default PrivateRoute;
