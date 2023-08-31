import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { ShoppingItemFormValues } from "../../types/FormTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";
import { MAX_LENGTH, shoppingItemDefaultValues } from "../../constants/DefaultValues";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { ErrorMessage } from "@hookform/error-message";

interface ShoppingItemFormProps {
  onFormSubmit: (data: ShoppingItemFormValues) => void;
}

const StyledForm = styled("form")({
  display: "flex",
  padding: "1rem",
  justifyContent: "space-between",
});

const StyledInput = styled(TextField)({
  width: "100%",
  padding: 0,
  margin: 0,
});

const ShoppingItemForm = ({ onFormSubmit }: ShoppingItemFormProps) => {
  const { t } = useTranslation();
  const userUid = useAppSelector(selectUserUid);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShoppingItemFormValues>({
    defaultValues: {
      ...shoppingItemDefaultValues,
      owner: userUid,
    },
  });

  const onSubmit = (data: ShoppingItemFormValues) => {
    onFormSubmit(data);
    reset(shoppingItemDefaultValues);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        id="input-with-icon-textfield"
        label={t("shoppingList.item.name")}
        {...register("name", {
          required: t("textField.error.required"),
          pattern: {
            value: /^(?!\s*$).+/,
            message: t("textField.error.required"),
          },
          maxLength: {
            value: MAX_LENGTH.SHOPPING_LIST,
            message: t("textField.error.maxLength", {
              number: MAX_LENGTH.SHOPPING_LIST,
            }),
          },
          onBlur: (e) => setValue("name", e.target.value.trim()),
        })}
        fullWidth
        error={!!errors["name"]}
        helperText={
          <ErrorMessage
            errors={errors}
            name={"name"}
            render={({ message }) => <>{message}</>}
          />
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledForm>
  );
};

export default ShoppingItemForm;
