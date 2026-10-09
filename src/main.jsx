import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import theme from "./theme";

// ThemeProvider makes our custom MUI theme available to every component.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* CssBaseline applies a consistent browser reset for MUI components. */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
