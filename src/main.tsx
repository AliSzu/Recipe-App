import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./i18n/i18n";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { Router } from "./router/router.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Router/>
    </React.StrictMode>
  </ThemeProvider>
);
