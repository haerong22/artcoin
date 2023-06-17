import { Card, CardContent } from "@mui/material";
import "./App.scss";
import wallets from "./wallets.json";
import { ConnectWallet } from "./components/ConnectWallet";
import { useState } from "react";
import { Wallet } from "./model/Wallet";
import { Chain } from "./model/Chain";

function App() {
  const [state, setState] = useState<{
    wallet?: Wallet;
    chain?: Chain;
  }>({});

  const handleWalletConnected = (wallet: Wallet, chain: Chain) => {
    setState({ wallet, chain });
  };

  return (
    <div className="App">
      <Card className="AppBody">
        <CardContent>
          <ConnectWallet
            wallets={wallets}
            onWalletConnected={handleWalletConnected}
          ></ConnectWallet>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
