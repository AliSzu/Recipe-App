import { Button, Divider, styled, useMediaQuery } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import IngredientsListForm from "./IngredientsListForm";
import PreparingStepsList from "./PreparingStepsList";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import InputFileField from "../molecules/InputFileField";
import { theme } from "../../theme/theme";
import { MAX_LENGTH } from "../../constants/DefaultValues";

interface RecipeFormProps {
  defaultValues: RecipeFormValues;
  onFormSubmit: (formData: RecipeFormValues) => void;
  isLoading?: boolean;
}

const StyledForm = styled("form")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  paddingTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const StyledDivider = styled(Divider)({
  paddingBottom: "1rem",
  paddingTop: "1rem",
});

const RecipeForm = ({
  defaultValues,
  onFormSubmit,
  isLoading,
}: RecipeFormProps) => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
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
            maxLength={MAX_LENGTH.NAME}
          />
          <FormField
            field="time"
            isError={!!errors.time}
            label={t("textField.label.time")}
            maxLength={MAX_LENGTH.TIME}
          />
          <FormField
            field="description"
            multiline={true}
            rows={5}
            isError={!!errors.description}
            label={t("textField.label.description")}
            maxLength={MAX_LENGTH.DESCRIPTION}
          />
          <InputFileField />
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
              fullWidth={matchDownSm}
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
