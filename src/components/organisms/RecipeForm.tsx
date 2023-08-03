import { Button, Divider, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import IngredientsListForm from "./IngredientsListForm";
import PreparingStepsList from "./PreparingStepsList";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import InputFileField from "../molecules/InputFileField";

interface RecipeFormProps {
  defaultValues: RecipeFormValues;
  onFormSubmit: (formData: RecipeFormValues) => void;
  isLoading: boolean;
}

const StyledForm = styled("form")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  paddingTop: "1rem",
});

const StyledDivider = styled(Divider)({
  paddingBottom: "1rem",
  paddingTop: "1rem",
});

const RecipeForm = ({
  defaultValues,
  onFormSubmit,
  isLoading,
}: RecipeFormProps) => {
  const methods = useForm<RecipeFormValues>({ defaultValues });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { t } = useTranslation();

  const onSubmit = (data: RecipeFormValues) => {
    onFormSubmit(data);
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
          <ButtonContainer>
            <Button
              type="submit"
              form="recipe-form"
              variant="contained"
              disabled={isLoading}
            >
              {t("button.submit")}
            </Button>
          </ButtonContainer>
        </div>
      </StyledForm>
    </FormProvider>
  );
};

export default RecipeForm;
