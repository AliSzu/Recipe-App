import { styled } from "@mui/material";
import RecipeList from "../components/organisms/RecipeList";
import { useTranslation } from "react-i18next";

const HomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "& > *": {
    paddingTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1.5rem",
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
      <RecipeList />
    </HomeContainer>
  );
};

export default Home;
