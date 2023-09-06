import { ListItemButton, ListItemText, styled } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface CollapseButtonProps {
  onClick: (open: boolean) => void;
  open: boolean;
  title: string
}

const StyledListItemText = styled(ListItemText)({
  color: 'black'
})

const CollapseButton = ({ onClick, open, title }: CollapseButtonProps) => {
  const handleClick = () => {
    onClick(!open);
  };

  return (
    <ListItemButton onClick={handleClick} disableGutters>
      <StyledListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
};

export default CollapseButton;
