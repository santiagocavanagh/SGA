import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#7ca5c5",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#D18B65",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#F4F1EB",
          paper: "#FFFCF7",
        },
        text: {
          primary: "#303841",
          secondary: "#68737D",
        },
        divider: "#DDD8CF",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#9DBAD0",
          contrastText: "#17232D",
        },
        secondary: {
          main: "#E6AD8A",
          contrastText: "#30231D",
        },
        background: {
          default: "#171C22",
          paper: "#222A33",
        },
        text: {
          primary: "#F0F2F4",
          secondary: "#B5BEC7",
        },
        divider: "#414B56",
      },
    },
  },
});

export default theme;
