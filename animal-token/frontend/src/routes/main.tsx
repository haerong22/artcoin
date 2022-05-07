import React, { FC, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintanimalTokenContract } from "../web3config";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) {
        return;
      }

      const response = await mintanimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      if (response.status) {
        const balanceLength = await mintanimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintanimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength) - 1)
          .call();

        const animalType = await mintanimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box>
        {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <Text>Let's mint Animal Card</Text>
        )}
      </Box>
      <Box>
        <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
          Mint
        </Button>
      </Box>
    </Flex>
  );
};

export default Main;
