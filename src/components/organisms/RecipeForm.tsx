import { Divider, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import IngredientsListForm from "./IngredientsListForm";
import PreparingStepsList from "./PreparingStepsList";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import InputFileField from "../molecules/InputFileField";
import { usePostRecipe, useUploadImage } from "../../api/recipes";
import { Recipe } from "../../types/RecipeTypes";
import { useAppDispatch } from "../../store/store";
import { showSnackbar } from "../../slices/snackbarSlice";

interface RecipeFormProps {
  defaultValues: RecipeFormValues;
}

const StyledForm = styled("form")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
});

const StyledDivider = styled(Divider)({
  paddingBottom: "1rem",
  paddingTop: "1rem",
});

const RecipeForm = ({ defaultValues }: RecipeFormProps) => {
  const methods = useForm<RecipeFormValues>({ defaultValues });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const postRecipeMutation = usePostRecipe();
  const uploadImageMutation = useUploadImage();

  const onSubmit = (data: RecipeFormValues) => {
    uploadImageMutation.mutate(data.image[0], {
      onSuccess: (url) => {
        const { image, ...formRecipe } = data;
        const recipe: Recipe = { ...formRecipe, imgSrc: url };
        postRecipeMutation.mutate(recipe, {
          onSuccess: () => {
            dispatch(
              showSnackbar({
                message: "post-success",
                severity: "success",
                autoHideDuration: 6000,
              })
            );
            reset();
          },
        });
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.message,
            severity: "success",
            autoHideDuration: 6000,
          })
        );
      },
    });
  };
  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} id="recipe-form">
        <div>
          <StyledDivider>{t("form.recipeInformation")}</StyledDivider>
          <FormField
            field="title"
            isError={!!errors.title}
            label={t("textField.label.name")}
          />
          <FormField
            field="time"
            isError={!!errors.time}
            label={t("textField.label.time")}
          />
          <FormField
            field="description"
            multiline={true}
            rows={5}
            isError={!!errors.description}
            label={t("textField.label.description")}
          />
          <InputFileField field="image" />
        </div>
        <div>
          <StyledDivider>{t("form.ingredientList")}</StyledDivider>
          <IngredientsListForm />
          <StyledDivider>{t("form.preparingSteps")}</StyledDivider>
          <PreparingStepsList />
        </div>
      </StyledForm>
    </FormProvider>
  );
};

export default RecipeForm;
