import { useFormContext } from "react-hook-form";
import { EmailFormValues } from "../../types/FormTypes";
import { TextField } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../constants/Regex";

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
          value: REGEX.EMAIL,
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
