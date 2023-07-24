import { Button, Typography, styled } from "@mui/material";
import Tile from "../atoms/Tile";
import CollapseList from "../organisms/CollapseList";
import NumberedList from "../molecules/NumberedList";
import TwoColumnList from "../molecules/TwoColumnsList";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../types/RecipeTypes";

interface RecipeLayoutProps{
  recipe: Recipe
}

const GridItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    width: "100%",
    gap: "1rem",
    "& > *": {
      width: "100%",
    },
  },
}));

const GridButton = styled(Button)(({ theme }) => ({
  width: "30%",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.light,
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const RecipeLayout = ({recipe}: RecipeLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Grid>
      <GridItem>
        <Tile recipe={recipe} />
        <Typography>
          {recipe.description}
        </Typography>
      </GridItem>
      <GridItem>
        <GridButton>{t("button.edit")}</GridButton>
        <CollapseList title={t('recipe.ingredients')}>
          <TwoColumnList items={recipe.ingredients} />
        </CollapseList>
      </GridItem>
      <GridItem>
        <CollapseList title={t('recipe.preparing')}>
          <NumberedList items={recipe.preparing} />
        </CollapseList>
      </GridItem>
    </Grid>
  );
};

export default RecipeLayout;
