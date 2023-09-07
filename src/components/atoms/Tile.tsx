import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  styled,
} from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MouseEvent } from "react";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { useAddRecipeToFavorite } from "../../api/favorite";

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

const StyledIcon = styled(IconButton)({
  padding: "1rem",
  color: "white",
});

interface TileProps {
  recipe: Recipe;
}

const Tile = ({ recipe }: TileProps) => {
  const userUid = useAppSelector(selectUserUid);

  const { mutate } = useAddRecipeToFavorite();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    mutate(
      { ...recipe, owner: userUid },
      {
        onSuccess: () => {
          console.log("duppa sranie");
        },
      }
    );
  };

  return (
    <StyledImageListItem onClick={handleClick} style={{ height: "100%" }}>
      <StyledImage src={recipe.imgSrc} loading="lazy" />
      <StyledImageListItemBar
        title={recipe.time}
        subtitle={recipe.title}
        actionIcon={
          <StyledIcon size="large" onClick={(e) => handleIconClick(e)}>
            <FavoriteIcon />
          </StyledIcon>
        }
      />
    </StyledImageListItem>
  );
};

export default Tile;
