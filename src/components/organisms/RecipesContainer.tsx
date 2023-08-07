import { useFetchRecipes } from "../../api/recipes";
import { useAppDispatch } from "../../store/store";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useTranslation } from "react-i18next";
import RecipesList from "../molecules/RecipesList";
import CenteredCircularProgress from "../atoms/CenteredCircularProgress";

const RecipeContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data, isError, error, isLoading } = useFetchRecipes();

  const recipesData = data && data.length > 0 && (
    <RecipesList recipes={data}></RecipesList>
  );

  if (isError) {
    dispatch(
      showSnackbar({
        message: error.code,
        autoHideDuration: 6000,
        severity: "error",
      })
    );
  }

  return (
    <>
      {isLoading ? (
        <CenteredCircularProgress />
      ) : recipesData ? (
        recipesData
      ) : (
        <div>{t("empty.recipes")}</div>
      )}
    </>
  );
};

export default RecipeContainer;
