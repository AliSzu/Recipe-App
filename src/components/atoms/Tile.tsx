import { ImageListItem, ImageListItemBar, styled } from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { useNavigate } from "react-router-dom";

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

const StyledImage = styled("img")({
  maxHeight: "30rem",
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

interface TileProps {
  recipe: Recipe;
}

const Tile = ({ recipe }: TileProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (
    <StyledImageListItem onClick={handleClick}>
      <StyledImage src={recipe.imgSrc} loading="lazy" />
      <StyledImageListItemBar title={recipe.time} subtitle={recipe.title} />
    </StyledImageListItem>
  );
};

export default Tile;
