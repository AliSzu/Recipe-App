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
  const {data, isError, error, isLoading} = useFetchRecipes();

  const recipesData = data && data.length > 0 && (
    <RecipesList recipes={data}></RecipesList>
  );

  if (isError) {
    dispatch(showSnackbar({ message: error.code }));
  }

  return (
    <>
      {isLoading ? (
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
