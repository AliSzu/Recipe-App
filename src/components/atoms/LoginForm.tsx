import { Button, styled } from "@mui/material";
import { useState } from "react";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { LoginFormProps } from "../../types/FormTypes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StyledForm = styled("div")({
  width: "100%",
});

const LoginForm = () => {
  const [loginValues, setLoginValues] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const { t } = useTranslation();

  yup.setLocale({
    mixed: {
      required: t("textField.error.required"),
    },
  });

  const loginSchema = yup.object({
    email: yup.string().email(t("textField.error.email")).required(),
    password: yup.string().required(),
  });

  const formContext = useForm<LoginFormProps>({
    defaultValues: loginValues,
    resolver: yupResolver(loginSchema),
  });

  return (
    <StyledForm>
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
    </StyledForm>
  );
};

export default LoginForm;
