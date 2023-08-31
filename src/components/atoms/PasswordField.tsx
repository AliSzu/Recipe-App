import { ErrorMessage } from "@hookform/error-message";
import { TextField } from "@mui/material";
import { useState } from "react";
import { FieldPath, RegisterOptions, useFormContext } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { PasswordFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";

interface PasswordFieldProps {
  field: FieldPath<PasswordFormValues>;
  label: string;
  validationSchema?: RegisterOptions<
    PasswordFormValues,
    "password" | "confirmPassword"
  >;
}

const PasswordField = ({
  field,
  label,
  validationSchema,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<PasswordFormValues>();

  const watchedField = watch(field)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
      <TextField
        label={label}
        fullWidth
        type={showPassword ? "text" : "password"}
        {...register(field, {
          minLength: {
            value: 6,
            message: t("textField.error.passwordLength"),
          },
          required: t("textField.error.required"),
          onChange: (e) => setValue(field, e.target.value.trim()),
          ...validationSchema,
        })}
        value={watchedField}
        error={!!errors[field]}
        helperText={
          <ErrorMessage
            errors={errors}
            name={field}
            render={({ message }) => <>{message}</>}
          />
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
  );
};

export default PasswordField;
