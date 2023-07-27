import { Divider, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import IngredientsListForm from "./IngredientsListForm";
import PreparingStepsList from "./PreparingStepsList";

interface RecipeFormProps {
  defaultValues: RecipeFormValues
}

const StyledForm = styled("form")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
});

const StyledDivider = styled(Divider)({
  paddingBottom: '1rem',
  paddingTop: '1rem'
})

const RecipeForm = ({defaultValues} : RecipeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    defaultValues,
  });
  const onSubmit = (data: RecipeFormValues) => {
    console.log(data)
  }
  return (
    <>
    <StyledForm onSubmit={handleSubmit(onSubmit)} id='recipe-form'>
      <div>
        <StyledDivider>Recipe Information</StyledDivider>
        <TextField
          {...register("title", {
            required: true,
          })}
          fullWidth
          label="title"
        />
        <TextField
          {...register("time", {
            required: true,
          })}
          fullWidth
          label="time"
        />
        <TextField
          {...register("description", {
            required: true,
          })}
          fullWidth
          multiline
          rows={5}
          label="description"
        />
      </div>
      <div>
        <StyledDivider>Ingredient List</StyledDivider>
        <IngredientsListForm
          {...{ control, register, defaultValues, errors }}
        />
        <StyledDivider>Preparing Steps</StyledDivider>
        <PreparingStepsList {...{ control, register, defaultValues, errors }}/>
      </div>
      <div>
      </div>
    </StyledForm>
    </>
  );
};

export default RecipeForm;
