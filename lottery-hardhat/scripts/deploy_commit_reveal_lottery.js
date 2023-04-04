const hre = require("hardhat");

async function main() {
  const CommitRevealLottery = await hre.ethers.getContractFactory(
    "CommitRevealLottery"
  );
  const commitRevealLottery = await CommitRevealLottery.deploy();

  await commitRevealLottery.deployed();

  console.log("CommitRevealLottery deployed to: ", commitRevealLottery.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
