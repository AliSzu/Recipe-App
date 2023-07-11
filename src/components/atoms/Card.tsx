import { styled } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
}

const StyledCard = styled("div")(({ theme }) => ({
  padding: "2rem",
  margin: '1rem',
  border: `1px solid ${theme.palette.secondary.light}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '30rem'
}));

export default function Card({ children }: CardProps) {
  return <StyledCard>{children}</StyledCard>;
}
