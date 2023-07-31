import { Button } from "@mui/material";
import {
  FormContainer,
  FormErrorProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { LoginFormProps } from "../../types/FormTypes";
import { useAppDispatch } from "../../store/store";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { useSignIn } from "../../api/auth";
import { hideSnackbar, showSnackbar } from "../../slices/snackbarSlice";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formContext = useForm<LoginFormProps>({
    defaultValues: { email: "", password: "" },
  });

  const signInMutation = useSignIn();

  const handleSignIn = (data: LoginFormProps) => {
    signInMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(
            login({
              email: response.email,
              refreshToken: response.refreshToken,
              uid: response.uid,
            })
          );
          dispatch(hideSnackbar());
          navigate(ROUTES.HOME);
        },
        onError: (error) => {
          dispatch(
            showSnackbar({
              message: error.code,
              autoHideDuration: null,
              severity: "error",
            })
          );
        },
      }
    );
  };

  return (
    <FormErrorProvider
      onError={(error) => {
        if (error.type === "required") {
          return t("textField.error.required");
        } else if (error.type === "pattern") {
          return t("textField.error.email");
        }
        return error?.message;
      }}
    >
      <FormContainer
        formContext={formContext}
        onSuccess={(data) => {
          handleSignIn(data);
        }}
      >
        <TextFieldElement
          name="email"
          label={t("textField.label.email")}
          fullWidth
          required
          type={"email"}
        />
        <PasswordElement
          name="password"
          label={t("textField.label.password")}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          {t("button.login")}
        </Button>
      </FormContainer>
    </FormErrorProvider>
  );
};

export default LoginForm;
