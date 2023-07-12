import { Button, styled } from "@mui/material";
import {
  FormContainer,
  FormErrorProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { SignUpFormProps } from "../../types/FormTypes";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiEndpoints";
import { login } from "../../slices/authSlice";
import { ROUTES } from "../../constants/routes";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUpFrom = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formContext = useForm<SignUpFormProps>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { watch } = formContext;

  const mutation = useMutation({
    mutationFn: (newUser: { email: string; password: string }) => {
      return axios.post(ENDPOINTS.CREATE_NEW_USER, {
        ...newUser,
        returnSecureToken: true,
      });
    },
  });

  const handleSignUp = (data: SignUpFormProps) => {
    mutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(login(response.data))
          navigate(ROUTES.HOME)
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
        <StyledButton type="submit" fullWidth>
          {t("button.signUp")}
        </StyledButton>
      </FormContainer>
    </FormErrorProvider>
  );
};

export default SignUpFrom;
