import { Button, styled } from "@mui/material";
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
import { ROUTES } from "../../constants/routes";
import AuthSnackbar from "../atoms/AuthSnackbar";
import { useSignIn } from "../../api/auth";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
              email: response.email!,
              refreshToken: response.refreshToken,
            })
          );
          navigate(ROUTES.HOME);
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
      <AuthSnackbar
        isError={signInMutation.isError}
        message={signInMutation.error?.code}
      />
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
        <StyledButton type="submit" fullWidth>
          {t("button.login")}
        </StyledButton>
      </FormContainer>
    </FormErrorProvider>
  );
};

export default LoginForm;
