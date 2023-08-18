import { ImageList, styled, useMediaQuery } from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { theme } from "../../theme/theme";
import Tile from "../atoms/Tile";

interface RecipesListProps {
  recipes: Recipe[];
}

const AnimatedTile = styled("div")({
  opacity: 0,
  animation: "fadeAndScale 1000ms cubic-bezier(0.6,-0.07, 0, 1.18)", 
  animationFillMode: "forwards", 
  "@keyframes fadeAndScale": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const RecipesList = ({ recipes }: RecipesListProps) => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
      {recipes.map((recipe: Recipe, index: number) => (
        <AnimatedTile
          key={recipe.id}
          style={{ animationDelay: `${index * 200}ms` }} 
        >
          <Tile recipe={recipe} />
        </AnimatedTile>
      ))}
    </ImageList>
  );
};

export default RecipesList;
