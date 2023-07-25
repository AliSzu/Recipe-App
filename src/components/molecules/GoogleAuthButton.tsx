import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSignInWithGoogle } from "../../api/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useAppDispatch } from "../../store/store";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../slices/snackbarSlice";

const GoogleAuthButton = () => {
  const signInWithGoogleMutation = useSignInWithGoogle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    signInWithGoogleMutation.mutate(provider, {
      onSuccess: (response) => {
        dispatch(
          login({
            email: response.email,
            refreshToken: response.refreshToken,
            uid: response.uid,
          })
        );
        navigate(ROUTES.HOME);
      },
      onError: (error) => {
        dispatch(showSnackbar({ message: error.code }));
      },
    });
  };
  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleClick}
      >
        {t("button.google")}
      </Button>
    </>
  );
};

export default GoogleAuthButton;
