import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import RecipeContainer from "../components/organisms/RecipesContainer";

const HomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
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
  return (
    <HomeContainer>
      <Title>{t("latestRecipes")}</Title>
      <RecipeContainer />
    </HomeContainer>
  );
};

export default Home;
