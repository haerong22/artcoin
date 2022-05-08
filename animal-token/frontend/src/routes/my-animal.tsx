import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { mintanimalTokenContract, saleAnimalTokenAddress } from "../web3config";

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<string[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintanimalTokenContract.methods
        .balanceOf(account)
        .call();

      const tempAnimalCardArray = [];
      for (let i = 0; i < parseInt(balanceLength, 10); i++) {
        const animalTokenId = await mintanimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call();

        const animalType = await mintanimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        tempAnimalCardArray.push(animalType);
      }

      setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintanimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) {
        return;
      }

      const response = await mintanimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getIsApprovedForAll();
    getAnimalTokens();
  }, [account]);

  useEffect(() => {
    console.log(animalCardArray);
  }, [animalCardArray]);

  return (
    <>
      <Flex alignItems={"center"}>
        <Text display={"inline-block"}>
          Sale Status : {saleStatus ? "True" : "False"}
        </Text>
        <Button
          size={"xs"}
          ml={2}
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproveToggle}
        >
          {saleStatus ? "Cancle" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return <AnimalCard key={i} animalType={v} />;
          })}
      </Grid>
    </>
  );
};

export default MyAnimal;
