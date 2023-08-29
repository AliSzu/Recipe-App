import { Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SignUpFormProps } from "../../types/FormTypes";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { ROUTES } from "../../constants/Routes";
import { useSignUp } from "../../api/auth";
import { hideSnackbar, showSnackbar } from "../../slices/snackbarSlice";
import { FormProvider, useForm } from "react-hook-form";
import PasswordField from "../atoms/PasswordField";
import EmailField from "../atoms/EmailField";

const StyledForm = styled("form")({
  width: "100%",
});

const SignUpFrom = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const {
    handleSubmit,
    watch,
  } = methods;

  const { mutate, isLoading } = useSignUp();

  const onSubmit = (data: SignUpFormProps) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(
            login({
              uid: response.uid,
            })
          );
          navigate(ROUTES.HOME);
          dispatch(hideSnackbar());
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
        <PasswordField
          field={"confirmPassword"}
          label={t("textField.label.confirmPassword")}
          validationSchema={{
            validate: (val: string) => {
              if (watch("password") !== val) {
                return t("textField.error.passwordMatch");
              }
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {t("button.signUp")}
        </Button>
      </StyledForm>
    </FormProvider>
  );
};

export default SignUpFrom;
