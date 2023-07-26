import { IconButton, TextField, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IngredientProps {
  ingredient: Ingredient;
  isDisabled: boolean;
  onIngredientEdit: (id: string) => void;
  onIngredientChange: (newIngredient: Ingredient) => void;
  onIngredientDelete: (id: string) => void;
}

interface IngredientsFormInput {
  [key: string]: string;
}

const IngredientContainer = styled("form")({
  display: "flex",
  justifyContent: "space-between",
});

const IngredientItem = ({
  ingredient,
  isDisabled,
  onIngredientEdit,
  onIngredientChange,
  onIngredientDelete,
}: IngredientProps) => {
  const { register, handleSubmit } = useForm<IngredientsFormInput>();
  const nameId = `${ingredient.id}-name`;
  const amountId = `${ingredient.id}-amount`;

  const onSubmit = (data: IngredientsFormInput) => {
    onIngredientChange({
      name: data[nameId],
      amount: data[amountId],
      id: ingredient.id,
    });
  };
  return (
    <IngredientContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="name"
          defaultValue={ingredient.name}
          disabled={isDisabled}
          {...register(nameId, { required: true })}
        />
        <TextField
          label="amount"
          defaultValue={ingredient.amount}
          disabled={isDisabled}
          {...register(amountId, { required: true })}
        />
      </div>
      <div>
        {isDisabled ? (
          <>
            <IconButton onClick={() => onIngredientEdit(ingredient.id)}>
              <EditIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton type="submit">
              <CheckIcon />
            </IconButton>
          </>
        )}
        <IconButton onClick={() => onIngredientDelete(ingredient.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </IngredientContainer>
  );
};

export default IngredientItem;
