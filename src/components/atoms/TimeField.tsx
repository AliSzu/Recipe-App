import { TextField, styled } from "@mui/material";
import { FieldPath, useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { REGEX } from "../../constants/Regex";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { TIME } from "../../constants/DefaultValues";

interface TimeFieldProps{
  field: FieldPath<RecipeFormValues>,
  watchedField: FieldPath<RecipeFormValues>,
  isError: boolean
}

const StyledTextField = styled(TextField)({
  marginBottom: "0",
});

const TimeField = ({field, watchedField, isError} : TimeFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<RecipeFormValues>();
  
  const { t } = useTranslation();

  return (
        <StyledTextField
          type="number"
          error={isError}
          fullWidth
          {...register(field, {
            required: t("textField.error.required"),
            validate: (value) => {
              if (value == 0 && watch(watchedField) == 0) {
                return t("textField.error.timeEmpty");
              }
            },
            pattern: {
              value: REGEX.TIME_NUMBER,
              message: t("textField.error.amount", {
                min: TIME.MIN,
                max: TIME.MAX,
              }),
            },
          })}
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

export default TimeField;
