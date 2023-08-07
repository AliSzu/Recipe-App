import { Popover, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeletePopoverProps {
  anchorEl: HTMLElement | null;
  onPopoverClose: () => void;
}

const DeletePopover = ({ anchorEl, onPopoverClose }: DeletePopoverProps) => {
  const { t } = useTranslation();
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: "none",
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={onPopoverClose}
      disableRestoreFocus
    >
      <Typography padding={1}>{t('popover.empty')}</Typography>
    </Popover>
  );
};

export default DeletePopover;
