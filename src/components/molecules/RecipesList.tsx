import { ImageList, useMediaQuery } from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { theme } from "../../theme/theme";
import Tile from "../atoms/Tile";

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = ({ recipes }: RecipesListProps) => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
      {recipes.map((recipe: Recipe) => (
        <Tile recipe={recipe} key={recipe.id} />
      ))}
    </ImageList>
  );
};

export default RecipesList;
