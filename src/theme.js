import { createTheme } from "@mui/material/styles";

// Centralize visual decisions so every future screen uses the same design system.
const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5", dark: "#3730A3" },
    secondary: { main: "#7C3AED" },
    background: { default: "#F4F6FB", paper: "#FFFFFF" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h3: { fontWeight: 700, letterSpacing: "-0.03em" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 700, textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: "none", borderRadius: 18 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
