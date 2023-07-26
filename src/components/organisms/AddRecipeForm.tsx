import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Ingredient } from "../../types/RecipeTypes";
import { useForm } from "react-hook-form";
import { uniqueId } from "../../utils/recipeUtils";
import IngredientItem from "../molecules/IngredientItem";

const AddRecipeForm = () => {
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [editableFields, setEditableFields] = useState<{
    [key: string]: boolean;
  }>({});

  interface IngredientsFormInput {
    amount: "";
    name: "";
  }

  const { register, handleSubmit } = useForm<IngredientsFormInput>();

  const onSubmit = (data: IngredientsFormInput) => {
    setIngredients((ingredients) => [
      ...ingredients,
      { name: data.name, amount: data.amount, id: uniqueId() },
    ]);
  };

  const onIngredientDelete = (ingredientId: string) => {
    const newIngredients = ingredients.filter(
      (ingredient: Ingredient) => ingredient.id !== ingredientId
    );
    setIngredients(newIngredients);
  };

  const onIngredientEdit = (ingredientId: string) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [ingredientId]: true,
    }));
  };

  const onIngredientChange = (newIngredient: Ingredient) => {
    console.log(newIngredient);

    const newIngredients = ingredients.map((ingredient: Ingredient) => {
      return ingredient.id === newIngredient.id ? newIngredient : ingredient;
    });
    setIngredients(newIngredients);
    setEditableFields((prevState) => ({
      ...prevState,
      [newIngredient.id]: false,
    }));
  };

  return (
    <>
      Add Ingredient
      {ingredients.map((ingredient: Ingredient) => (
        <IngredientItem
          key={uniqueId()}
          ingredient={ingredient}
          isDisabled={!editableFields[ingredient.id]}
          onIngredientEdit={onIngredientEdit}
          onIngredientChange={onIngredientChange}
          onIngredientDelete={onIngredientDelete}
        />
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="name" {...register("name", { required: true })} />
        <TextField label="amount" {...register("amount", { required: true })} />
        <IconButton type="submit">
          <AddIcon />
        </IconButton>
      </form>
    </>
  );
};

export default AddRecipeForm;
