import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { CurrencyProvider } from "./context/CurrencyContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary title="CalabarPass Portal Recovery" message="An unexpected error occurred. Please reload to restore all services.">
      <ThemeProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
