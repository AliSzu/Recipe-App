import { Collapse, styled, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../../theme/theme";
import CollapseButton from "../atoms/CollapseButton";

interface CollapseListProps {
  children: React.ReactNode;
  title: string
}

const Title = styled("div")({
  fontSize: "2rem",
  fontWeight: "600",
  color: 'black'
});

const CollapseList = ({ children, title }: CollapseListProps) => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(!matchDownSm);

  useEffect(() => {
    setIsOpen(!matchDownSm)
  }, [matchDownSm])

  const handleClick = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      {matchDownSm ? (
        <CollapseButton open={isOpen} onClick={handleClick} title={title}></CollapseButton>
      ) : (
        <Title>{title}</Title>
      )}
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
};

export default CollapseList;
