import { ImageList, useMediaQuery } from "@mui/material";
import Tile from "../molecules/Tile";
import { theme } from "../../theme/theme";
import { RECIPES_INFO } from "../../constants/mocks/RecipesTile";

const RecipeList = () => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
      {RECIPES_INFO.map((recipe) => (
        <Tile recipe={recipe} key={recipe.title} />
      ))}
    </ImageList>
  );
};

export default RecipeList;
