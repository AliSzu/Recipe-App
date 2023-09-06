import { ImageListItem, ImageListItemBar, styled } from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { useNavigate } from "react-router-dom";
import { TimeToText } from "../../utils/utils";

const StyledImageListItemBar = styled(ImageListItemBar)({
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5648634453781513) 40%, rgba(0,212,255,0) 100%)",
  height: "70%",
  alignItems: "end",
});

const StyledImageListItem = styled(ImageListItem)({
  cursor: "pointer",
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

  const formattedTime = TimeToText(recipe.time);

  return (
    <StyledImageListItem onClick={handleClick} style={{height: '100%'}}>
      <StyledImage src={recipe.imgSrc} loading="lazy" />
      <StyledImageListItemBar title={formattedTime} subtitle={recipe.title} />
    </StyledImageListItem>
  );
};

export default Tile;
