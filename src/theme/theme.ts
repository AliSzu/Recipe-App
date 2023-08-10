import { createTheme } from "@mui/material/styles";
import Inter from "../fonts/Inter-VariableFont_slnt,wght.ttf";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    google: Palette["primary"];
  }
  interface PaletteOptions {
    google: PaletteOptions["primary"];
  }
}

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
      dark: "#d7d7d7",
    },
    google: { main: "#DB4437", dark: "#BD2E22" },
  },
});

globalTheme.typography.body1 = {
  fontFamily: "Inter",
  fontSize: 20,
  [globalTheme.breakpoints.down('md')] : {
    fontSize: 18
  },
  [globalTheme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
};

export const theme = createTheme(
  {
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: "xl",
        },
        styleOverrides: {
          root: {
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
          },
          containedPrimary: {
            color: globalTheme.palette.secondary.light,
          },
        },
        defaultProps: {
          disableElevation: true,
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
          input: {
            textAlign: "center",
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
        styleOverrides: {
          "@font-face": {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "500",
            src: `url(${Inter}) format("truetype")`,
          },
        },
      },
    },
  },
  globalTheme
);
