import { Button, styled } from "@mui/material";
import RecipeForm from "../organisms/RecipeForm";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";

interface RecipeLayoutProps {
  defaultValues: RecipeFormValues;
}

const FormContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});

const RecipeFormLayout = ({ defaultValues }: RecipeLayoutProps) => {
  const { t } = useTranslation();
  return (
    <FormContainer>
      <RecipeForm defaultValues={defaultValues} />
      <ButtonContainer>
        <Button
          type="submit"
          form="recipe-form"
          variant="contained"
          disableElevation
        >
          {t("button.submit")}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};
export default RecipeFormLayout;
