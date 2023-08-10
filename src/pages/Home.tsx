import { ImageList, styled, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFetchRecipes } from "../api/recipes";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import SortSelector from "../components/organisms/SortSelector";
import { useEffect, useState } from "react";
import { OrderByDirection } from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { useInView } from "react-intersection-observer";
import { theme } from "../theme/theme";
import Tile from "../components/atoms/Tile";

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
  const [sortOrder, setSortOrder] = useState<OrderByDirection>("desc");
  const [sortProperty, setSortProperty] = useState<keyof Recipe>("createdAt");

  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const { data, isError, error, isFetching, fetchNextPage } = useFetchRecipes(
    sortProperty,
    sortOrder
  );

  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSort = (
    sortType: OrderByDirection,
    sortProperty: keyof Recipe
  ) => {
    setSortOrder(sortType);
    setSortProperty(sortProperty);
  };

  const recipesData =
    data &&
    data.pages &&
    data.pages.map((page) =>
      page.recipes.map((recipe: Recipe) => (
        <Tile recipe={recipe} key={recipe.id} />
      ))
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
      <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
        {recipesData}
        {isFetching ? <CenteredCircularProgress /> : <div ref={ref} />}
      </ImageList>
    </HomeContainer>
  );
};

export default Home;
