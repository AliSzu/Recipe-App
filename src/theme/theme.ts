import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffbb00",
      light: "#ffffff",
    },
    secondary: {
      main: "#f5bc41",
      light: "#efefef",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});
