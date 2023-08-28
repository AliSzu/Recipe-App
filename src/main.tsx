import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./i18n/i18n";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { Router } from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react"; 
import { rollbarConfig } from "./rollbar.ts";

const queryClient = new QueryClient();
const persistor = persistStore(store);


function TestErro2() {
  const b = null;
  return b.hello()
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
      <TestErro2 />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
              </ThemeProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);
