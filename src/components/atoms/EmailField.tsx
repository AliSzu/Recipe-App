import { useFormContext } from "react-hook-form";
import { EmailFormValues } from "../../types/FormTypes";
import { TextField } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";

const EmailField = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailFormValues>();

  return (
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
  );
};

export default EmailField;
