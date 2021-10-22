const hello = artifacts.require("Hello");
const type = artifacts.require("Type");

module.exports = function (deployer) {
  deployer.deploy(hello);
  deployer.deploy(type);
}