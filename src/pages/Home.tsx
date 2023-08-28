import { ImageList, styled, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFetchRecipes } from "../api/recipes";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import { useEffect, useState } from "react";
import { Order, Recipe, SelectItem } from "../types/RecipeTypes";
import { useInView } from "react-intersection-observer";
import { theme } from "../theme/theme";
import Tile from "../components/atoms/Tile";
import { SORT_ITEMS } from "../constants/SortItems";
import { uniqueId } from "../utils/utils";
import { Category } from "../enums/Category";
import { OrderByDirection } from "firebase/firestore";
import Selector from "../components/organisms/Selector";
import SearchBar from "../components/molecules/SearchBar";

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

const ActionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: '1rem',
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const SelectContainer = styled('div')({
  display: 'flex',
  gap: '1rem'
})

const Home = () => {
  const [sortProperty, setSortProperty] = useState<Order>({
    sort: "updatedAt",
    direction: "desc",
  });
  const [filter, setFilter] = useState<string>();
  const [searchPhrase, setSearchPhrase] = useState<string>()

  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const { data, isError, error, isFetching, fetchNextPage } = useFetchRecipes(
    sortProperty,
    filter,
    searchPhrase
  );

  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
  }, [isError, dispatch, showSnackbar]);

  const handleSort = (property: string, order?: OrderByDirection) => {
    if (!order) return;
    setSortProperty({ sort: property, direction: order });
  };

  const handleFilter = (property: string) => {
    setFilter(property);
  };

  const handleSearch = (phrase: string) => {
    setSearchPhrase(phrase)
  }

  const recipesData =
    data &&
    data.pages &&
    data.pages.map((page) =>
      page.recipes.map((recipe: Recipe) => (
        <Tile recipe={recipe} key={recipe.id} />
      ))
    );

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
      <ActionsContainer>
        <SearchBar onSearch={handleSearch} />
        <SelectContainer>
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
        </SelectContainer>
      </ActionsContainer>
      <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
        {recipesData}
        {isFetching && data ? <CenteredCircularProgress /> : <div ref={ref} />}
      </ImageList>
    </HomeContainer>
  );
};

export default Home;
