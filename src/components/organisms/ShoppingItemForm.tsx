import { IconButton, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { ShoppingItemFormValues } from "../../types/FormTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AmountPicker from "../molecules/AmountPicker";
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

const StyledAmountPicker = styled(AmountPicker)({
  color: "red",
});

const ShoppingItemForm = ({ onFormSubmit }: ShoppingItemFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ShoppingItemFormValues>({
      defaultValues: shoppingItemDefaultValues
    });

  const onAmountChange = (amount: number) => setValue("amount", amount);

  const onSubmit = (data: ShoppingItemFormValues) => {
    onFormSubmit(data)
    reset(shoppingItemDefaultValues)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <TextField label={t('shoppingList.item.name')} {...register("name", { required: true })} />
      <div>
        <StyledAmountPicker
          amount={watch("amount")}
          onAmountChange={onAmountChange}
        />
        <IconButton type="submit">
          <AddCircleIcon />
        </IconButton>
      </div>
    </StyledForm>
  );
};

export default ShoppingItemForm;
