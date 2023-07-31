import {
  Divider,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import IngredientsListForm from "./IngredientsListForm";
import PreparingStepsList from "./PreparingStepsList";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import InputFileField from "../molecules/InputFileField";

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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    getValues
  } = useForm<RecipeFormValues>({
    defaultValues,
  });
  const { t } = useTranslation();

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data);
    // TODO: SEND RECIPE TO FIREBASE
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} id="recipe-form">
      <div>
        <StyledDivider>{t("form.recipeInformation")}</StyledDivider>
        <FormField
          {...{ register, errors }}
          field="title"
          isError={!!errors.title}
          label={t("textField.label.name")}
        />
        <FormField
          {...{ register, errors }}
          field="time"
          isError={!!errors.time}
          label={t("textField.label.time")}
        />
        <FormField
          {...{ register, errors }}
          field="description"
          multiline={true}
          rows={5}
          isError={!!errors.description}
          label={t("textField.label.description")}
        />
        <InputFileField {...{register, control, setValue, watch, errors, getValues}} field="image" isError={!!errors.image}/>
      </div>
      <div>
        <StyledDivider>{t("form.ingredientList")}</StyledDivider>
        <IngredientsListForm
          {...{ control, register, defaultValues, errors }}
        />
        <StyledDivider>{t("form.preparingSteps")}</StyledDivider>
        <PreparingStepsList {...{ control, register, defaultValues, errors }} />
      </div>
    </StyledForm>
  );
};

export default RecipeForm;
