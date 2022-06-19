import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount, useCaver } from "../hooks";

const Home: NextPage = () => {
  const { account } = useAccount();
  const { caver, mintGemTokenContract, saleGemTokenContract } = useCaver();

  useEffect(() => {
    console.log(account);
    console.log(caver);
    console.log(mintGemTokenContract);
    console.log(saleGemTokenContract);
  });

  return <Box>Home</Box>;
};

export default Home;
