import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { logout } from "../slices/authSlice";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(logout)
        navigate(ROUTES.LOGIN);
      }
    });
  }, [navigate, auth, dispatch]);
};
