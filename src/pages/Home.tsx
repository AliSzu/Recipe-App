import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFetchRecipes } from "../api/recipes";
import RecipesList from "../components/molecules/RecipesList";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";

const HomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& > *": {
    paddingTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.5rem",
    },
  },
}));

const Title = styled("div")(({ theme }) => ({
  fontSize: "1.75rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const Home = () => {
  const { t } = useTranslation();
  const { data, isError, error, isFetching } = useFetchRecipes();
  const dispatch = useAppDispatch();

  const recipesData = data && data.length !== 0 && (
    <RecipesList recipes={data} />
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
    <HomeContainer>
      <Title>{t("latestRecipes")}</Title>
      {isFetching ? (
        <CenteredCircularProgress />
      ) : recipesData ? (
        recipesData
      ) : (
        <div>{t("emptyRecipes")}</div>
      )}
    </HomeContainer>
  );
};

export default Home;
