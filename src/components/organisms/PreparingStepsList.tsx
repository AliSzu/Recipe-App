import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, TextField } from "@mui/material";
import { uniqueId } from "../../utils/recipeUtils";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldContainer from "../molecules/ArrayFieldContainer";

interface PreparingListProps {
  control: Control<RecipeFormValues>;
  register: UseFormRegister<RecipeFormValues>;
}

const PreparingStepsList = ({ control, register }: PreparingListProps) => {
  const {
    fields: preparingFields,
    append: preparingAppend,
    remove: preparingRemove,
  } = useFieldArray({
    control,
    name: "preparing",
  });
  return (
    <>
      {preparingFields.map((item, index) => {
        return (
          <ArrayFieldContainer
            key={item.id}
            remove={preparingRemove}
            fieldsNumber={preparingFields.length}
            index={index}
          >
            <TextField
              fullWidth
              multiline
              label="step"
              {...register(`preparing.${index}.step` as const, {
                required: true,
              })}
            />
          </ArrayFieldContainer>
        );
      })}

      <Button
        onClick={() => {
          preparingAppend({
            step: "",
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

export default PreparingStepsList;
