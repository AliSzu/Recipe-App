import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  recipeId?: string;
  recipeName: string;
  onDeleteRecipe: (recipeId: string) => void;
}

const StyledActionButton = styled(Button)({
  padding: "0.5rem",
});


const DeleteModal = ({
  recipeId,
  recipeName,
  onDeleteRecipe,
}: DeleteModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = () => {
    recipeId && onDeleteRecipe(recipeId);
  };
  return (
    <>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        {t("button.delete")}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle fontSize={20}>
          {t("dialog.delete.title", {item: t('recipe.name')})}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" padding={2}>
            {t("dialog.delete.message", {itemName: recipeName})}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledActionButton onClick={handleClose} variant="contained">
            {t("button.cancel")}
          </StyledActionButton>
          <StyledActionButton
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            {t("button.delete")}
          </StyledActionButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
