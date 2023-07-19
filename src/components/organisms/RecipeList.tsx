import {
  CircularProgress,
  ImageList,
  styled,
  useMediaQuery,
} from "@mui/material";
import Tile from "../molecules/Tile";
import { theme } from "../../theme/theme";
import { useFetchRecipes } from "../../api/recipes";
import { Recipe } from "../../types/RecipeTypes";
import { useAppDispatch } from "../../store/store";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useTranslation } from "react-i18next";

const ProgressContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeList = () => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const recipesQuery = useFetchRecipes();

  const recipesData =
    recipesQuery.data &&
    recipesQuery.data.map((recipe: Recipe) => (
      <Tile recipe={recipe} key={recipe.title}></Tile>
    ));

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
        <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
          {recipesData}
        </ImageList>
      ) : (
        <div>{t("emptyRecipes")}</div>
      )}
    </>
  );
};

export default RecipeList;
