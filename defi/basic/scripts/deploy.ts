import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Factory = await ethers.getContractFactory("Factory");
  const contract = await Factory.deploy();

  const Token = await ethers.getContractFactory("Token");
  const tokenContract = await Token.deploy("BobbyToken", "BOBBY", 1000);

  const Exchange = await ethers.getContractFactory("Exchange");
  const exchangeContract = await Exchange.deploy(tokenContract.address);

  console.log("Contract deployed at: ", contract.address);
  console.log("Token Contract deployed at: ", tokenContract.address);
  console.log("Exchange Contract deployed at: ", exchangeContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
