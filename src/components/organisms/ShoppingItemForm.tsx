import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { ShoppingItemFormValues } from "../../types/FormTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";
import { shoppingItemDefaultValues } from "../../constants/DefaultValues";

interface ShoppingItemFormProps {
  onFormSubmit: (data: ShoppingItemFormValues) => void;
}

const StyledForm = styled("form")({
  display: "flex",
  padding: "1rem",
  justifyContent: "space-between",
});

const StyledInput = styled(TextField)({
  padding: 0,
  margin: 0,
});

const ShoppingItemForm = ({ onFormSubmit }: ShoppingItemFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<ShoppingItemFormValues>({
    defaultValues: shoppingItemDefaultValues,
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
        {...register("name", { required: true })}
        fullWidth
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
