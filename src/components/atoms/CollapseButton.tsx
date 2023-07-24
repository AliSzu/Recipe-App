import { ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface CollapseButtonProps {
  onClick: (open: boolean) => void;
  open: boolean;
  title: string
}

const CollapseButton = ({ onClick, open, title }: CollapseButtonProps) => {
  const handleClick = () => {
    onClick(!open);
  };

  return (
    <ListItemButton onClick={handleClick} disableGutters>
      <ListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
};

export default CollapseButton;
