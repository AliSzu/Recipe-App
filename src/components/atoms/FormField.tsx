import { TextField } from "@mui/material";
import { RecipeFormValues } from "../../types/FormTypes";
import { FieldPath, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FormFieldProps {
  isError: boolean;
  field: FieldPath<RecipeFormValues>;
  multiline?: boolean;
  rows?: number;
  label: string;
}

const FormField = ({
  field,
  multiline,
  rows,
  isError,
  label,
}: FormFieldProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const error = (
    <ErrorMessage
      errors={errors}
      name={field}
      render={({ message }) => <>{message}</>}
    />
  );

  return (
    <TextField
      label={label}
      {...register(field, {
        required: t("textField.error.required"),
      })}
      fullWidth
      helperText={error}
      multiline={multiline}
      rows={rows ? rows : 1}
      error={isError}
    />
  );
};

export default FormField;
