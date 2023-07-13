import { styled } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
}

const StyledCard = styled("div")(({ theme }) => ({
  padding: "2rem",
  margin: "1rem",
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "30rem",
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.down('sm')] : {
    padding: "1.5rem",
    border: 'none',
    margin: '0'
  }
}));

export default function Card({ children }: CardProps) {
  return <StyledCard>{children}</StyledCard>;
}
