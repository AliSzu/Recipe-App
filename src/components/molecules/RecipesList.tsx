import { styled } from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import Tile from "../atoms/Tile";

interface RecipesListProps {
  recipes: Recipe[];
  onShowButton: (index: number) => void
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

const RecipesList = ({ recipes, onShowButton }: RecipesListProps) => {

  return (
    <>
      {recipes.map((recipe: Recipe, index: number) => (
        <AnimatedTile
          key={recipe.id}
          style={{ animationDelay: `${index * 200}ms` }}
          onAnimationEnd={() => onShowButton(index)}
        >
          <Tile recipe={recipe} />
        </AnimatedTile>
      ))}
    </>
  );
};

export default RecipesList;
