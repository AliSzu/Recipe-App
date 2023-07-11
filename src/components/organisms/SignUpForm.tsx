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
import { SignUpFormProps } from "../../types/FormTypes";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUpFrom = () => {
  const [signUpValues, setSignUpValues] = useState<SignUpFormProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();

  const formContext = useForm<SignUpFormProps>({
    defaultValues: signUpValues,
  });

  const { watch } = formContext;

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
        onSuccess={(data) => setSignUpValues(data)}
      >
        {/* TODO: ON SUCCESS SEND DATA TO THE DATABASE AND REGISTER NEW ACCOUNT */}
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
