import { Button, styled } from "@mui/material";
import { useState } from "react";
import {
  FormContainer,
  FormErrorProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { LoginFormProps } from "../../types/FormTypes";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LoginForm = () => {
  const [loginValues, setLoginValues] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const { t } = useTranslation();

  const formContext = useForm<LoginFormProps>({
    defaultValues: loginValues,
  });

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
          setLoginValues(data);
        }}
        // TODO: ON SUCCESS SEND DATA TO THE DATABASE AND LOG IN
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
