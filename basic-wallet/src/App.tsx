import { Card, CardContent } from "@mui/material";
import "./App.scss";

import { ConnectWallet } from "./components/ConnectWallet";

function App() {
  return (
    <div className="App">
      <Card className="AppBody">
        <CardContent>
          <ConnectWallet></ConnectWallet>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
