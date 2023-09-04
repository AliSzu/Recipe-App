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
import { Order, SelectItem } from "../types/RecipeTypes";
import Selector from "../components/organisms/Selector";
import { SORT_ITEMS } from "../constants/SortItems";
import { Category } from "../enums/Category";
import { uniqueId } from "../utils/utils";
import { OrderByDirection } from "firebase/firestore";

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
  const [filter, setFilter] = useState<string>();
  const [sortProperty, setSortProperty] = useState<Order>({
    sort: "updatedAt",
    direction: "desc",
  });

  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const { data, isError, error, isFetching, fetchNextPage } = useFetchRecipes(
    sortProperty,
    filter
  );

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

  const handleSort = (property: string, order?: OrderByDirection) => {
    if (!order) return;
    setSortProperty({ sort: property, direction: order });
  };

  const handleFilter = (property: string) => {
    setFilter(property);
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

  const categoryOptions: SelectItem[] = Object.keys(Category).map(
    (category) => ({
      id: uniqueId(),
      name: category,
      propertyName: category,
    })
  );

  return (
    <HomeContainer>
      <Title>{t("latestRecipes")}</Title>
      <ButtonContainer>
        <Selector
          onSelect={handleSort}
          selectItems={SORT_ITEMS}
          name="sort.name"
        />
        <Selector
          onSelect={handleFilter}
          selectItems={categoryOptions}
          name="filter"
        />
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
