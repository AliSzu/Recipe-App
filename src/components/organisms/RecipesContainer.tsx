import { CircularProgress, styled } from "@mui/material";
import { useFetchRecipes } from "../../api/recipes";
import { useAppDispatch } from "../../store/store";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useTranslation } from "react-i18next";
import RecipesList from "../molecules/RecipesList";

const ProgressContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const recipesQuery = useFetchRecipes();

  const recipesData = recipesQuery.data && recipesQuery.data.length > 0 && (
    <RecipesList recipes={recipesQuery.data}></RecipesList>
  );

  if (recipesQuery.isError) {
    dispatch(showSnackbar({ message: recipesQuery.error.code }));
  }

  return (
    <>
      {recipesQuery.isLoading ? (
        <ProgressContainer>
          <CircularProgress />
        </ProgressContainer>
      ) : recipesData ? (
        recipesData
      ) : (
        <div>{t("emptyRecipes")}</div>
      )}
    </>
  );
};

export default RecipeContainer;
