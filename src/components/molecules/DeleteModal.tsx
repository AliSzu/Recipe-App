import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
  wordBreak: "break-all",
});

const StyledDialogActions = styled(DialogActions)({
  padding: "1rem",
});

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem'
  } 
}))

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
        <StyledDialogTitle>
          {t("dialog.delete.title", { item: t("recipe.name") })}
        </StyledDialogTitle>
        <Divider />
        <StyledDialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("dialog.delete.message", { itemName: recipeName })}
          </DialogContentText>
        </StyledDialogContent>
        <Divider />
        <StyledDialogActions>
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
        </StyledDialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
