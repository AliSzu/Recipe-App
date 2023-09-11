import { FieldPath, useFormContext } from "react-hook-form";
import { ShoppingItemFormValues } from "../../types/FormTypes";
import { TextField, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../constants/Regex";
import { ErrorMessage } from "@hookform/error-message";

interface IngredientFormFieldProps {
  field: FieldPath<ShoppingItemFormValues>;
  maxLength: number;
}

const StyledInput = styled(TextField)({
  width: "100%",
  padding: 0,
  margin: 0,
});

const IngredientFormField = ({
  field,
  maxLength,
}: IngredientFormFieldProps) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ShoppingItemFormValues>();

  return (
    <StyledInput
      label={t(`shoppingList.item.${field}`)}
      {...register(field, {
        required: t("textField.error.required"),
        pattern: {
          value: REGEX.ONLY_WHITESPACE,
          message: t("textField.error.required"),
        },
        maxLength: {
          value: maxLength,
          message: t("textField.error.maxLength", {
            number: maxLength,
          }),
        },
        onBlur: (e) => setValue(field, e.target.value.trim()),
      })}
      fullWidth
      error={!!errors[field]}
      helperText={
        <ErrorMessage
          errors={errors}
          name={field}
          render={({ message }) => <>{message}</>}
        />
      }
    />
  );
};

export default IngredientFormField;
