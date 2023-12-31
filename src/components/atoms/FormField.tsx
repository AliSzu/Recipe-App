import { TextField } from "@mui/material";
import { RecipeFormValues } from "../../types/FormTypes";
import { FieldPath, RegisterOptions, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { REGEX } from "../../constants/Regex";
import { AMOUNT } from "../../constants/DefaultValues";

interface FormFieldProps {
  isError: boolean;
  field: FieldPath<RecipeFormValues>;
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  maxLength?: number;
}

const FormField = ({
  field,
  multiline,
  rows,
  isError,
  label,
  maxLength,
  type,
}: FormFieldProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<RecipeFormValues>();

  const error = (
    <ErrorMessage
      errors={errors}
      name={field}
      render={({ message }) => <>{message}</>}
    />
  );

  const validationRules: RegisterOptions<RecipeFormValues> = {
    required: t("textField.error.required"),
    onBlur: (e) => setValue(field, e.target.value.trim()),
    validate: {
      hasWhiteSpaces: (value) => {
        if (typeof value === "string") {
          if (!REGEX.ONLY_WHITESPACE.test(value)) {
            return t("textField.error.required");
          }
          if (type === "number" && !REGEX.AMOUNT.test(value)) {
            return t("textField.error.amount", {
              min: AMOUNT.MIN,
              max: AMOUNT.MAX,
            });
          }
        }
      },
    },
    maxLength: maxLength && {
      value: maxLength,
      message: t("textField.error.maxLength", {
        number: maxLength,
      }),
    },
  };

  return (
    <TextField
      label={label}
      {...register(field, validationRules)}
      fullWidth
      helperText={error}
      multiline={multiline}
      rows={rows ? rows : 1}
      error={isError}
      type={type}
    />
  );
};

export default FormField;
