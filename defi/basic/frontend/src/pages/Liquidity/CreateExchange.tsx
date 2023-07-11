import { Button, TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { getFactoryContract } from "../..//utils/ethers";

export function CreateExchange(props: any) {
  const [newExchangeToken, setNewExchangeTokenInput] = useState<string>("");

  const handleNewExchangeTokenChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNewExchangeTokenInput(event.target.value);
  };

  const handleCreateExchange = async () => {
    getFactoryContract(props.network).createExchange(newExchangeToken);
  };

  return (
    <div>
      <TextField
        label="TokenAddress"
        onChange={handleNewExchangeTokenChange}
      ></TextField>
      <Button onClick={handleCreateExchange}>Create Exchange</Button>
    </div>
  );
}
