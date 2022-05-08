import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { mintanimalTokenContract, web3 } from "../web3config";
import AnimalCard from "./AnimalCard";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
  animalTokenId: string;
  account: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalType,
  animalPrice,
  animalTokenId,
  account,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokenOwner = async () => {
    try {
      const response = await mintanimalTokenContract.methods
        .ownerOf(animalTokenId)
        .call();

      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnimalTokenOwner();
  }, []);

  return (
    <Box textAlign={"center"} w={150}>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text d="inline-block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        <Button size={"sm"} colorScheme="green" m={2} disabled={isBuyable}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
