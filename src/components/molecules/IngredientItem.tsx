import { IconButton, TextField, styled } from "@mui/material";
import { UseFieldArrayRemove } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFormRegister } from "react-hook-form";
import { RecipeFormProps } from "../../types/FormTypes";
import ArrayFieldContainer from "./ArrayFieldContainer";
interface IngredientProps {
  index: number;
  register: UseFormRegister<RecipeFormProps>;
  remove: UseFieldArrayRemove;
  fieldsNumber: number
}

const TextFieldContainer = styled("div")({
  display: 'flex',
  columnGap: '1rem'
})

const IngredientItem = ({ index, register, remove, fieldsNumber }: IngredientProps) => {
  return (
    <ArrayFieldContainer  index={index} remove={remove} fieldsNumber={fieldsNumber}>
      <TextFieldContainer>
        <TextField
          {...register(`ingredients.${index}.name` as const, {
            required: true,
          })}
          label="name"
          fullWidth
        />

        <TextField
          {...register(`ingredients.${index}.amount` as const, {
            required: true,
          })}
          label="amount"
          fullWidth
        />
      </TextFieldContainer>
    </ArrayFieldContainer>
  );
};

export default IngredientItem;
