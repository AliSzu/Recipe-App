import { Button, styled } from "@mui/material";
import { useState } from "react";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { SignUpFormProps } from "../../types/FormTypes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  yup.setLocale({
    mixed: {
      required: t("textField.error.required"),
    },
  });

  const registerSchema = yup.object({
    email: yup.string().email(t("textField.error.email")).required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), ""], t("textField.error.passwordMatch")),
  });

  const formContext = useForm<SignUpFormProps>({
    defaultValues: signUpValues,
    resolver: yupResolver(registerSchema),
  });

  return (
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
      />
      <PasswordElement
        name="confirmPassword"
        label={t("textField.label.confirmPassword")}
        fullWidth
        required
      />
      <StyledButton type="submit" fullWidth>
        {t("button.signUp")}
      </StyledButton>
    </FormContainer>
  );
};

export default SignUpFrom;
