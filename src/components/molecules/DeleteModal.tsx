import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme/theme";

interface DeleteModalProps {
  recipeId?: string;
  recipeName: string;
  onDeleteRecipe: () => void;
}

const StyledActionButton = styled(Button)({
  padding: "0.5rem",
});

const DeleteModal = ({ recipeName, onDeleteRecipe }: DeleteModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        {t("button.delete")}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle fontSize={20}>
          {t("dialog.delete.title", { item: t("recipe.name") })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("dialog.delete.message", { itemName: recipeName })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledActionButton
            onClick={handleClose}
            variant="contained"
            fullWidth={matchDownSm}
          >
            {t("button.cancel")}
          </StyledActionButton>
          <StyledActionButton
            onClick={onDeleteRecipe}
            variant="contained"
            color="error"
            fullWidth={matchDownSm}
          >
            {t("button.delete")}
          </StyledActionButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
