import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Web3ReactProvider } from "@web3-react/core";
import { getProvider } from "./utils/ethers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
