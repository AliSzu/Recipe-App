import { ImageList, useMediaQuery } from "@mui/material";
import Tile from "../molecules/Tile";
import { RecipeTile } from "../../types/RecipeTypes";
import { theme } from "../../theme/theme";

const MOCK_ITEMS: RecipeTile[] = [
  {
    title: "Pancakes",
    time: "50 min",
    image:
      "https://wszystkiegoslodkiego.pl/storage/images/202111/puszyste-pancakes.jpg",
  },
  {
    title: "Pancakes 2",
    time: "20 min",
    image:
      "https://img.delicious.com.au/yXfWTc5v/del/2023/02/p106-pancakes-with-roasted-vanilla-bean-berries-and-nectarines-183881-1.png",
  },
  {
    title: "Sweet Pancakes",
    time: "2 hour",
    image:
      "https://www.pogotujmy.pl/wp-content/uploads/2015/10/PANCAKES-2.jpg?p=131",
  },
];

const RecipeList = () => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
      {MOCK_ITEMS.map((recipe) => (
        <Tile recipe={recipe} key={recipe.title} />
      ))}
    </ImageList>
  );
};

export default RecipeList;
