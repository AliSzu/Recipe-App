import { Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoginFormProps, SignUpFormProps } from "../../types/FormTypes";
import { useAppDispatch } from "../../store/store";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { useSignIn } from "../../api/auth";
import { hideSnackbar, showSnackbar } from "../../slices/snackbarSlice";
import { FormProvider, useForm } from "react-hook-form";
import PasswordField from "../atoms/PasswordField";
import EmailField from "../atoms/EmailField";

const StyledForm = styled("form")({
  width: "100%",
});

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { handleSubmit } = methods;

  const signInMutation = useSignIn();

  const onSubmit = (data: LoginFormProps) => {
    signInMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(
            login({
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
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <EmailField />
        <PasswordField
          field={"password"}
          label={t("textField.label.password")}
        />
        <Button type="submit" variant="contained" fullWidth>
          {t("button.login")}
        </Button>
      </StyledForm>
    </FormProvider>
  );
};

export default LoginForm;
