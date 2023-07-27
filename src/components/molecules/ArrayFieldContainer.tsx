import { IconButton, styled } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFieldArrayRemove } from "react-hook-form";

interface ArrayFieldContainerProps {
  children: React.ReactNode;
  remove: UseFieldArrayRemove;
  fieldsNumber: number;
  index: number
}

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ArrayFieldContainer = ({ children, remove, fieldsNumber, index }: ArrayFieldContainerProps) => {
  return (
    <Container>
      {children}
      <div>
      <IconButton onClick={() => remove(index)} disabled={fieldsNumber <= 1} >
        <DeleteIcon />
      </IconButton>
      </div>
    </Container>
  );
};
export default ArrayFieldContainer;
