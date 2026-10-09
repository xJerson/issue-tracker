import { createTheme } from "@mui/material/styles";

// Centralize visual decisions so every future screen uses the same design system.
const theme = createTheme({
  palette: {
    primary: { main: "#007C78", dark: "#005B58", light: "#D8F0EE" },
    secondary: { main: "#2B5D8A" },
    background: { default: "#EAF0F4", paper: "#FFFFFF" },
    text: { primary: "#172B3A", secondary: "#587080" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "Segoe UI Variable, Segoe UI, system-ui, sans-serif",
    h3: { fontWeight: 750, letterSpacing: "-0.035em", lineHeight: 1.05 },
    h4: { fontWeight: 750, letterSpacing: "-0.025em" },
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 700, textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: "none", borderRadius: 10 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", borderRadius: 10 },
      },
    },
  },
});

export default theme;
