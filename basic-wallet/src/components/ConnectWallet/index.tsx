import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./ConnectWallet.scss";
import wallets from "../../wallets.json";
import { Chain } from "../../model/Chain";
import { Wallet } from "../../model/Wallet";
import { useState } from "react";

export const ConnectWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [walletId, setWalletId] = useState("");
  const [chains, setChains] = useState(new Array<Chain>());
  const [chain, setChain] = useState<Chain | null>();
  const [chainId, setChainId] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [walletInstalled, setWalletInstalled] = useState<Boolean>();

  const handleSelectWallet = (event: any) => {
    const selectedWallet = wallets.find(
      (wallet) => wallet.id === event.target.value
    );
    setChain(null);
    setChainId("");
    setChains([]);

    if (selectedWallet) {
      setWalletId(event.target.value);
      setWallet(selectedWallet);
      setChains(selectedWallet.chains);

      const firstChain = selectedWallet.chains[0];
      if (selectedWallet.chains.length === 1) {
        setChain(firstChain);
        setChainId(firstChain.id);
      }
    }
  };

  return (
    <div className="ConnectWallet">
      <FormControl className="FormControl">
        <InputLabel>Select Wallet</InputLabel>
        <Select
          id="WalletDropdown"
          labelId="Wallet"
          value={walletId}
          label="Select Wallet"
          onChange={handleSelectWallet}
        >
          {wallets.map((wallet, index) => (
            <MenuItem className="DropdownItem" key={index} value={wallet.id}>
              <div className={"icon " + wallet.icon}></div>
              <span>{wallet.name}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
