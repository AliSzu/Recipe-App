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
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ENDPOINTS } from "../../constants/apiEndpoints";
import { useAppDispatch } from "../../store/store";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { ErrorData } from "../../types/ErrorTypes";
import AuthSnackbar from "../atoms/AuthSnackbar";
import { useState } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(" ");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formContext = useForm<LoginFormProps>({
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (user: { email: string; password: string }) => {
      return axios.post(ENDPOINTS.SIGN_IN, {
        ...user,
        returnSecureToken: true,
      });
    },
  });

  const handleSignIn = (data: LoginFormProps) => {
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
        } else if (error.type === "pattern") {
          return t("textField.error.email");
        }
        return error?.message;
      }}
    >
      <AuthSnackbar isError={mutation.isError} message={errorMessage} />
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
