import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskProvider } from "metamask-react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darktheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2b32b2",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darktheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MetaMaskProvider>
          <App />
        </MetaMaskProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
