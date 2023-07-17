import { ImageListItem, ImageListItemBar, styled } from "@mui/material";
import { RecipeTile } from "../../types/RecipeTypes";

const StyledImageListItemBar = styled(ImageListItemBar)({
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5648634453781513) 50%, rgba(0,212,255,0) 100%)",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

const StyledImageListItem = styled(ImageListItem)({
  borderRadius: "5px",
});

interface TileProps {
  recipe: RecipeTile;
}

const Tile = ({ recipe }: TileProps) => {
  return (
    <StyledImageListItem>
      <img src={recipe.image} />
      <StyledImageListItemBar title={recipe.time} subtitle={recipe.title} />
    </StyledImageListItem>
  );
};

export default Tile;
