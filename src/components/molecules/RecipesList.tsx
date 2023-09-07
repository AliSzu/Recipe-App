import { styled } from "@mui/material";
import { FavoriteRecipe, Recipe } from "../../types/RecipeTypes";
import Tile from "../atoms/Tile";

interface RecipesListProps {
  recipes: Recipe[];
  favoriteRecipes: FavoriteRecipe[];
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

const RecipesList = ({ recipes, favoriteRecipes, onShowButton }: RecipesListProps) => {

  const findRecipeInFavorites = (id?: string) => {
    if (!id) return false
    const checkUsername = (obj: FavoriteRecipe) => obj.id === id;
    return favoriteRecipes.some(checkUsername)
  }

  return (
    <>
      {recipes.map((recipe: Recipe, index: number) => (
        <AnimatedTile
          key={recipe.id}
          style={{ animationDelay: `${index * 200}ms` }}
          onAnimationEnd={() => onShowButton(index)}
        >
          <Tile recipe={recipe} favorite={findRecipeInFavorites(recipe.id)} />
        </AnimatedTile>
      ))}
    </>
  );
};

export default RecipesList;
