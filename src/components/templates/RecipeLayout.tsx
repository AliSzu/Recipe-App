import { Button, Typography, styled } from "@mui/material";
import Tile from "../atoms/Tile";
import CollapseList from "../organisms/CollapseList";
import NumberedList from "../molecules/NumberedList";
import TwoColumnList from "../molecules/TwoColumnsList";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../types/RecipeTypes";
import DeleteModal from "../molecules/DeleteModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";

interface RecipeLayoutProps {
  recipe: Recipe;
  onDeleteRecipe: () => void;
}

const GridItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  wordBreak: "break-all",
});

const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
  color: "#646363",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    width: "100%",
    gap: "1rem",
    "& > *": {
      width: "100%",
    },
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  "& Button": {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const RecipeLayout = ({ recipe, onDeleteRecipe }: RecipeLayoutProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userUid = useAppSelector(selectUserUid);

  const handleRecipeEdit = () => {
    navigate(`${ROUTES.EDIT_RECIPE}/${recipe.id}`);
  };

  return (
    <Grid>
      <GridItem>
        <Tile recipe={recipe} />
        <Typography>{recipe.description}</Typography>
        {t("category")} : {t(recipe.category)}
      </GridItem>
      <GridItem>
        {userUid === recipe.owner && (
          <ButtonContainer>
            <Button variant="outlined" onClick={handleRecipeEdit}>
              {t("button.edit")}
            </Button>
            <DeleteModal
              recipeId={recipe.id}
              onDeleteRecipe={onDeleteRecipe}
              recipeName={recipe.title}
            />
          </ButtonContainer>
        )}
        <CollapseList title={t("recipe.ingredients")}>
          <TwoColumnList items={recipe.ingredients} />
        </CollapseList>
      </GridItem>
      <GridItem>
        <CollapseList title={t("recipe.preparing")}>
          <NumberedList items={recipe.preparing} />
        </CollapseList>
      </GridItem>
    </Grid>
  );
};

export default RecipeLayout;
