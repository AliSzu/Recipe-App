import { ImageList, useMediaQuery } from "@mui/material";
import { useFetchFavorite } from "../api/favorite";
import { selectUserUid } from "../slices/authSlice";
import { useAppSelector } from "../store/store";
import { FavoriteRecipe } from "../types/RecipeTypes";
import Tile from "../components/atoms/Tile";
import { theme } from "../theme/theme";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";

const Favorite = () => {
  const userUid = useAppSelector(selectUserUid);
  const { data } = useFetchFavorite(userUid);

  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

 

  const recipeTile = data && data.map((recipe: FavoriteRecipe) => (
    <Tile key={recipe.id} recipe={recipe} favorite={true}/>
  ))

  return (
    <>
      {data && (
        <ImageList cols={matchDownSm ? 1 : 3} gap={10}>
          {recipeTile ? recipeTile : <CenteredCircularProgress/>}
        </ImageList>
      )}
    </>
  );
};

export default Favorite;
