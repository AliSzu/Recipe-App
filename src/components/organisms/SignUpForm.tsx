import { Button } from "@mui/material";
import {
  FormContainer,
  FormErrorProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { SignUpFormProps } from "../../types/FormTypes";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { ROUTES } from "../../constants/Routes";
import { useSignUp } from "../../api/auth";
import { hideSnackbar, showSnackbar } from "../../slices/snackbarSlice";

const SignUpFrom = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formContext = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { watch } = formContext;

  const signUpMutation = useSignUp();

  const handleSignUp = (data: SignUpFormProps) => {
    signUpMutation.mutate(
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
    <FormErrorProvider
      onError={(error) => {
        if (error.type === "required") {
          return t("textField.error.required");
        } else if (error.type === "minLength") {
          return t("textField.error.passwordLength");
        }
        return error.message;
      }}
    >
      <FormContainer
        formContext={formContext}
        onSuccess={(data) => handleSignUp(data)}
      >
        <TextFieldElement
          required
          label="Email"
          name="email"
          fullWidth
          type="email"
        ></TextFieldElement>
        <PasswordElement
          name="password"
          label={t("textField.label.password")}
          fullWidth
          required
          validation={{
            minLength: 6,
          }}
        />
        <PasswordElement
          name="confirmPassword"
          label={t("textField.label.confirmPassword")}
          fullWidth
          required
          validation={{
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
      </FormContainer>
    </FormErrorProvider>
  );
};

export default SignUpFrom;
