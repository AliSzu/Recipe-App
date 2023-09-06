import { styled } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
}

const StyledCard = styled("div")(({ theme }) => ({
  padding: "3rem",
  gap: "1rem",
  margin: "1rem",
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: '50rem',
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.down('md')] : {
    width: '80%'
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0",
    border: "none",
    margin: "0",
    width: '100%'
  },
}));

export default function Card({ children }: CardProps) {
  return <StyledCard>{children}</StyledCard>;
}
