import { ImageList, styled, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFetchRecipes } from "../api/recipes";
import RecipesList from "../components/molecules/RecipesList";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { theme } from "../theme/theme";
import { Order } from "../types/RecipeTypes";
import Selector from "../components/organisms/Selector";

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

const ButtonContainer = styled("div")({
  display: "flex",
  gap: "1rem",
});

const Home = () => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [sortProperty, setSortProperty] = useState<Order>({
    sort: "updatedAt",
    direction: "desc",
  });

  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const { data, isError, error, isFetching, fetchNextPage } =
    useFetchRecipes(sortProperty);

  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(
        showSnackbar({
          message: error.code,
          autoHideDuration: 6000,
          severity: "error",
        })
      );
    }
  }, [dispatch, error, isError]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleShowButton = (index: number) => {
    if (index + 1 === data?.pages[0].recipes.length) {
      setIsAnimationFinished(true);
    } else {
      setIsAnimationFinished(false);
    }
  };

  const handleSort = (orderElements: Order) => {
    setSortProperty(orderElements);
  };

  const recipesData =
    data &&
    data.pages &&
    data.pages.map((page, index) => (
      <RecipesList
        recipes={page.recipes}
        key={index}
        onShowButton={handleShowButton}
      />
    ));

  return (
    <HomeContainer>
      <Title>{t("latestRecipes")}</Title>
      <ButtonContainer>
        <Selector onSort={handleSort} />
      </ButtonContainer>
      <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
        {recipesData}
        {isFetching ? (
          <CenteredCircularProgress />
        ) : (
          isAnimationFinished && <div ref={ref}></div>
        )}
      </ImageList>
    </HomeContainer>
  );
};

export default Home;
