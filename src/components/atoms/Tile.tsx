import {
  IconButton,
  IconButtonProps,
  ImageListItem,
  ImageListItemBar,
  styled,
} from "@mui/material";
import { Recipe } from "../../types/RecipeTypes";
import { useNavigate } from "react-router-dom";
import { TimeToText } from "../../utils/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import {
  useAddRecipeToFavorite,
  useDeleteFavoriteRecipe,
} from "../../api/favorite";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/QueryKeys";

interface TileProps {
  recipe: Recipe;
  favorite: boolean;
}

interface StyledIconButtonProps extends IconButtonProps {
  liked?: boolean;
}

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

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "liked",
})<StyledIconButtonProps>(({ liked, theme }) => ({
  color: liked ? theme.palette.primary.main : "white",
  padding: "1rem",
}));

const Tile = ({ recipe, favorite }: TileProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(favorite);
  const userUid = useAppSelector(selectUserUid);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { mutate: addRecipeMutation } = useAddRecipeToFavorite();
  const { mutate: deleteRecipeMutation } = useDeleteFavoriteRecipe();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const formattedTime = TimeToText(recipe.time);
  
  const handleSuccess = (dispatchMessage: string) => {
    dispatch(
      showSnackbar({
        message: dispatchMessage,
        autoHideDuration: null,
        severity: "success",
      })
    );
    setIsLiked(!isLiked);
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.favoriteData],
    });
  };

  const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isLiked) {
      addRecipeMutation(
        { ...recipe, owner: userUid },
        {
          onSuccess: () => {
            handleSuccess("favorite-add-success");
          },
        }
      );
    } else {
      deleteRecipeMutation(
        { ...recipe, owner: userUid },
        {
          onSuccess: () => {
            handleSuccess("favorite-delete-success");
          },
        }
      );
    }
  };

  return (
    <StyledImageListItem onClick={handleClick} style={{ height: "100%" }}>
      <StyledImage src={recipe.imgSrc} loading="lazy" />
      <StyledImageListItemBar
        title={formattedTime}
        subtitle={recipe.title}
        actionIcon={
          <StyledIconButton
            size="large"
            onClick={(e) => handleIconClick(e)}
            liked={isLiked}
          >
            <FavoriteIcon />
          </StyledIconButton>
        }
      />
    </StyledImageListItem>
  );
};

export default Tile;
