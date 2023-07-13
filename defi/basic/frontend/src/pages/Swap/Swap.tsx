import { Button, InputAdornment, TextField } from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import { useState, ChangeEvent, useEffect } from "react";
import {
  calculateSlippage,
  getEthToTokenOutputAmount,
} from "../../functions/swap";
import { fromWei, onEthToTokenSwap, toWei } from "../../utils/ethers";
import { BOBBY_ADDRESS } from "../../constants/addresses";

export function Swap(props: any) {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const slippage = 200;

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const onSwap = async () => {
    onEthToTokenSwap(
      toWei(inputValue),
      toWei(outputValue),
      BOBBY_ADDRESS,
      props.network
    );
  };

  async function getOutputAmount() {
    const output = await getEthToTokenOutputAmount(
      inputValue,
      BOBBY_ADDRESS,
      props.network
    );
    const outputWithSlippage = calculateSlippage(slippage, output).minimum;
    setOutputValue(fromWei(outputWithSlippage));
  }

  useEffect(() => {
    if (inputValue !== "") {
      getOutputAmount();
    }
  }, [inputValue]);

  return (
    <div>
      <div>
        <TextField
          value={inputValue}
          onChange={handleInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">ETH</InputAdornment>
            ),
          }}
        />
      </div>
      <SwapVerticalCircleIcon />
      <div>
        <TextField
          value={outputValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">BOBBY</InputAdornment>
            ),
          }}
        />
      </div>
      <Button color="primary" variant="contained" onClick={onSwap}>
        Swap
      </Button>
    </div>
  );
}
