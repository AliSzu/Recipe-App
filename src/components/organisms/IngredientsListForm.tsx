import { RecipeFormValues } from "../../types/FormTypes";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { uniqueId } from "../../utils/recipeUtils";
import { Button, styled, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldContainer from "../molecules/ArrayFieldContainer";

interface IngredientsListProps {
  control: Control<RecipeFormValues>;
  register: UseFormRegister<RecipeFormValues>;
}

const TextFieldContainer = styled("div")({
  display: "flex",
  columnGap: "1rem",
});

const IngredientsListForm = ({ control, register }: IngredientsListProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  return (
    <>
      {fields.map((item, index) => {
        return (
          <ArrayFieldContainer
            key={item.id}
            remove={remove}
            index={index}
            fieldsNumber={fields.length}
          >
            <TextFieldContainer>
              <TextField
                {...register(`ingredients.${index}.name` as const, {
                  required: "This is required message",
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
      })}

      <Button
        onClick={() => {
          append({
            amount: "",
            name: "",
            id: uniqueId(),
          });
        }}
        fullWidth
        variant="contained"
        disableElevation
      >
        <AddIcon />
      </Button>
    </>
  );
};

export default IngredientsListForm;
