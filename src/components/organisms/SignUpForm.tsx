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
import { AxiosError } from "axios";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { ROUTES } from "../../constants/routes";
import { ErrorData } from "../../types/ErrorTypes";
import { useState } from "react";
import AuthSnackbar from "../atoms/AuthSnackbar";
import { useSignUp } from "../../api/auth";

const SignUpFrom = () => {
  const [errorMessage, setErrorMessage] = useState(" ");
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formContext = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { watch } = formContext;

  const mutation = useSignUp();

  const handleSignUp = (data: SignUpFormProps) => {
    mutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(login(response.data));
          navigate(ROUTES.HOME);
        },
        onError: (error) => {
          const errorResponse = error as AxiosError;
          const errorData = errorResponse.response?.data as ErrorData;
          setErrorMessage(errorData.error.message);
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
      <AuthSnackbar isError={mutation.isError} message={errorMessage} />
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
        <Button type="submit" fullWidth>
          {t("button.signUp")}
        </Button>
      </FormContainer>
    </FormErrorProvider>
  );
};

export default SignUpFrom;
