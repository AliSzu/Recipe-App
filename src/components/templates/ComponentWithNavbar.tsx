import { Container } from "@mui/material";
import { Navbar } from "../molecules/Navbar";

interface IComponentWithNavbar {
  children: React.ReactNode;
}

export const ComponentWithNavbar = ({ children }: IComponentWithNavbar) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
