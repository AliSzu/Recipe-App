import { TextField } from "@mui/material";
import { RecipeFormValues } from "../../types/FormTypes";
import { FieldPath, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormFieldProps {
  register: UseFormRegister<RecipeFormValues>;
  isError: boolean;
  field: FieldPath<RecipeFormValues>;
  multiline?: boolean;
  rows?: number;
  label: string;
}

const FormField = ({
  register,
  field,
  multiline,
  rows,
  isError,
  label,
}: FormFieldProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <TextField
        label={label}
        {...register(field, {
          required: true,
        })}
        fullWidth
        helperText={isError ? t("textField.error.required") : ""}
        multiline={multiline}
        rows={rows ? rows : 1}
        error={isError}
      />
    </div>
  );
};

export default FormField;
