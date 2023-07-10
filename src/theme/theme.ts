import { createTheme } from "@mui/material/styles";
import Inter from "../fonts/Inter.woff2";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffbb00",
      light: "#ffffff",
    },
    secondary: {
      main: "#ffa200",
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
          height: "100%",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "2rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0.8rem",
          fontSize: '1rem'
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
