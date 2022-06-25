import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { SALE_GEM_TOKEN_ADDRESS } from "../caver.config";
import { useAccount, useCaver, useMetadata } from "../hooks";
import { GemTokenData } from "../interfaces";
import GemCard from "./GemCard";

export interface MyGemCardProps {
  gemTokenData: GemTokenData;
}

const MyGemCard: FC<MyGemCardProps> = ({ gemTokenData }) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myGemPrice, setMyGemPrice] = useState<string>(gemTokenData.tokenPrice);

  const { metadataURI, getMetadata } = useMetadata();
  const { account } = useAccount();
  const { caver, saleGemTokenContract } = useCaver();

  const onClickSell = async () => {
    try {
      if (!account || !caver || !saleGemTokenContract) return;

      const response = await caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: account,
        to: SALE_GEM_TOKEN_ADDRESS,
        gas: "3000000",
        data: saleGemTokenContract.methods
          .setForSaleGemToken(
            gemTokenData.tokenId,
            caver.utils.convertToPeb(sellPrice, "KLAY")
          )
          .encodeABI(),
      });

      if (response.status) {
        setMyGemPrice(caver.utils.convertToPeb(sellPrice, "KLAY"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMetadata(gemTokenData.gemTokenRank, gemTokenData.gemTokenType);
  }, []);

  return (
    <Box w={200} my={2}>
      <GemCard metadataURI={metadataURI} />
      {myGemPrice === "0" ? (
        <Flex>
          <InputGroup size={"sm"}>
            <Input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
            <InputRightAddon children="Klay" />
          </InputGroup>
          <Button size={"sm"} onClick={onClickSell} ml={2}>
            Sell
          </Button>
        </Flex>
      ) : (
        <Box>{caver?.utils.convertFromPeb(myGemPrice, "KLAY")} KLAY</Box>
      )}
    </Box>
  );
};

export default MyGemCard;
