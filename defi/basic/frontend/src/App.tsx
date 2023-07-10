import { useWeb3React } from "@web3-react/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Liquidity } from "./pages/Liquidity/Liquidity";
import { Swap } from "./pages/Swap/Swap";
import { injected } from "./utils/connectors";

function App() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => {
      if (error) {
        alert(error);
      }
    });
  };

  return (
    <div className="App">
      <div>
        <p>Account: {account}</p>
        <p>ChainId: {chainId}</p>
      </div>

      <div>
        <button onClick={handleConnect}>
          {active ? "DisConnect" : "connect"}
        </button>
      </div>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Swap></Swap>}></Route>
          <Route path="/liquidity" element={<Liquidity></Liquidity>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
