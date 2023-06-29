import { ethers } from "hardhat";
import { expect } from "chai";

import { BigNumber } from "ethers";

import { Exchange } from "../typechain-types/contracts/Exchange";
import { Token } from "../typechain-types/contracts/Token";

const toWei = (value: number) => ethers.utils.parseEther(value.toString());
const toEther = (value: BigNumber) => ethers.utils.formatEther(value);

const getBalance = ethers.provider.getBalance;

describe("Exchange", () => {
  let owner: any;
  let user: any;
  let exchange: Exchange;
  let token: Token;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("Token");
    token = await TokenFactory.deploy("BobbyToken", "BOBBY", toWei(1000000));
    await token.deployed();

    const ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy(token.address);
    await exchange.deployed();
  });

  describe("addLiquidity", async () => {
    it("add Liquidity", async () => {
      await token.approve(exchange.address, toWei(500));
      await exchange.addLiquidity(toWei(500), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(500));

      await token.approve(exchange.address, toWei(100));
      await exchange.addLiquidity(toWei(100), { value: toWei(200) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1200));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(600));
    });
  });

  describe("addLiquidityV2", async () => {
    it("add Liquidity V2", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidityV2(toWei(1000), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(1000));
    });
  });

  describe("ethToTokenSwap", async () => {
    it("ethToTokenSwap", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      await exchange.connect(user).ethToTokenSwap({ value: toWei(1) });
      expect(await getBalance(exchange.address)).to.equal(toWei(1001));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(999));
      expect(await token.balanceOf(user.address)).to.equal(toWei(1));
    });
  });

  describe("getTokenPrice", async () => {
    it("correct get Token Price", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      const tokenReserve = await token.balanceOf(exchange.address);
      const etherReserve = await getBalance(exchange.address);

      expect(await exchange.getPrice(tokenReserve, etherReserve)).to.eq(1);
    });
  });

  describe("getOutputAmount", async () => {
    it("add Liquidity", async () => {
      await token.approve(exchange.address, toWei(4000));
      await exchange.addLiquidity(toWei(4000), { value: toWei(1000) });

      console.log(
        toEther(
          await exchange.getOutputAmount(
            toWei(1),
            getBalance(exchange.address),
            token.balanceOf(exchange.address)
          )
        )
      );
    });
  });

  describe("ethToTokenSwapV2", async () => {
    it("ethToTokenSwapV2", async () => {
      await token.approve(exchange.address, toWei(4000));
      await exchange.addLiquidity(toWei(4000), { value: toWei(1000) });

      await exchange
        .connect(user)
        .ethToTokenSwapV2(toWei(3.99), { value: toWei(1) });

      console.log(toEther(await token.balanceOf(user.address)));
    });
  });
});
