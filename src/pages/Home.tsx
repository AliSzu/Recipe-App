import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFetchRecipes } from "../api/recipes";
import RecipesList from "../components/organisms/RecipesList";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import SortSelector from "../components/organisms/SortSelector";
import { useState } from "react";
import { OrderByDirection } from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";

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

const SortButtonContainer = styled("div")({
  display: "flex",
  gap: "1rem",
});

const Home = () => {
  const [sortOrder, setSortOrder] = useState<OrderByDirection>();
  const [sortProperty, setSortProperty] = useState<keyof Recipe>("createdAt");

  const { t } = useTranslation();
  const { data, isError, error, isFetching } = useFetchRecipes(
    sortProperty,
    sortOrder
  );

  const dispatch = useAppDispatch();

  const handleSort = (
    sortType: OrderByDirection,
    sortProperty: keyof Recipe
  ) => {
    setSortOrder(sortType);
    setSortProperty(sortProperty);
  };

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
      <SortButtonContainer>
        <SortSelector onSort={handleSort} sortProperty="title" />
        <SortSelector onSort={handleSort} sortProperty="updatedAt" />
        <SortSelector onSort={handleSort} sortProperty="time" />
      </SortButtonContainer>
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
