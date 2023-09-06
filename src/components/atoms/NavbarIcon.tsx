import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";

const Icon = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary?.light,
  padding: "1rem",
  borderRadius: "10px",
  cursor: 'pointer'
}));

const Circle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary?.main,
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
}));

export default function NavbarIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Icon onClick={handleClick}>
      <Circle />
    </Icon>
  );
}
