import { createTheme } from "@mui/material/styles";
import Inter from "../fonts/Inter.woff2";

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
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local('Inter'), url(${Inter}) format('woff2');`,
    },
  },
});
