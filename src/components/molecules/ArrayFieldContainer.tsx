import { IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFieldArrayRemove } from "react-hook-form";
import DeletePopover from "../atoms/DeletePopover";

interface ArrayFieldContainerProps {
  children: React.ReactNode;
  remove: UseFieldArrayRemove;
  fieldsNumber: number;
  index: number;
}

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ArrayFieldContainer = ({
  children,
  remove,
  fieldsNumber,
  index,
}: ArrayFieldContainerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const disabled = fieldsNumber <= 1;
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    disabled && setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    disabled && setAnchorEl(null);
  };
  return (
    <Container>
      {children}
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <IconButton onClick={() => remove(index)} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
        <DeletePopover anchorEl={anchorEl} onPopoverClose={handlePopoverClose}/>
      </div>
    </Container>
  );
};
export default ArrayFieldContainer;
