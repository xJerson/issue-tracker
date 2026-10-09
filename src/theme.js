import { createTheme } from "@mui/material/styles";

// Centralize visual decisions so every future screen uses the same design system.
const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5" },
    background: { default: "#F8FAFC", paper: "#FFFFFF" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h3: { fontWeight: 700, letterSpacing: "-0.03em" },
  },
});

export default theme;
