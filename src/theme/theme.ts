import { createTheme } from "@mui/material/styles";
import Inter from "../fonts/Inter.woff2";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#ffbb00",
      light: "#fbf8f2",
      dark: "#ffa302",
    },
    secondary: {
      main: "#efefef",
      light: "#ffffff",
    },
  },
});

export const theme = createTheme(
  {
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
            fontSize: "1rem",
            backgroundColor: globalTheme.palette.primary.main,
            color: globalTheme.palette.primary.light,
            "&:hover": {
              backgroundColor: globalTheme.palette.secondary.main,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: "inherit",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "inherit",
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: "0px",
          },
        },
      },
      MuiImageListItemBar: {
        styleOverrides: {
          titleWrap: {
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "column",
            rowGap: "0.3rem",
            padding: "1rem",
            [globalTheme.breakpoints.down("sm")]: {
              padding: "0.75rem",
            },
          },
          title: {
            fontSize: "0.85rem",
            [globalTheme.breakpoints.down("sm")]: {
              fontSize: "0.8rem",
            },
          },
          subtitle: {
            fontSize: "1.5rem",
            [globalTheme.breakpoints.down("sm")]: {
              fontSize: "1.3rem",
            },
          },
        },
      },
      MuiImageListItem: {
        styleOverrides: {
          root: {
            overflow: "hidden",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: "60%",
          },
          root: {
            width: "60%",
            flexShrink: "0",
          },
        },
        defaultProps: {
          variant: "temporary",
          anchor: "right",
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
  },
  globalTheme
);
