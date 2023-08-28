import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SignUpFormProps } from "../../types/FormTypes";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { ROUTES } from "../../constants/Routes";
import { useSignUp } from "../../api/auth";
import { hideSnackbar, showSnackbar } from "../../slices/snackbarSlice";
import { FormProvider, useForm } from "react-hook-form";
import PasswordField from "../molecules/PasswordField";
import { ErrorMessage } from "@hookform/error-message";

const SignUpFrom = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const signUpMutation = useSignUp();

  const onSubmit = (data: SignUpFormProps) => {
    signUpMutation.mutate(
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          type="email"
          {...register("email", {
            required: t("textField.error.required"),
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,10}[a-zA-Z0-9])?)*$/g,
              message: t("textField.error.email"),
            },
          })}
          error={!!errors["email"]}
          helperText={
            <ErrorMessage
              errors={errors}
              name={"email"}
              render={({ message }) => <>{message}</>}
            />
          }
        />
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
        <Button variant="contained" type="submit" fullWidth>
          {t("button.signUp")}
        </Button>
      </form>
    </FormProvider>
  );
};

export default SignUpFrom;
