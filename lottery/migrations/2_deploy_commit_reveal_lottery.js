const CommitRevealLottery = artifacts.require("CommitRevealLottery");

module.exports = (deployer) => {
  deployer.deploy(CommitRevealLottery);
};
