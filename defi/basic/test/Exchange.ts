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
    token = await TokenFactory.deploy("BobbyToken", "BOBBY", toWei(50));
    await token.deployed();

    const ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy(token.address);
    await exchange.deployed();
  });

  describe.skip("addLiquidity", async () => {
    it("add Liquidity", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(1000));
    });
  });

  describe.skip("addLiquidityV2", async () => {
    it("add Liquidity V2", async () => {
      await token.approve(exchange.address, toWei(500));
      await exchange.addLiquidityV2(toWei(500), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(500));

      await token.approve(exchange.address, toWei(100));
      await exchange.addLiquidityV2(toWei(100), { value: toWei(200) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1200));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(600));
    });
  });

  describe.skip("removeLiquidity", async () => {
    it("remove Liquidity", async () => {
      await token.approve(exchange.address, toWei(500));
      await exchange.addLiquidityV2(toWei(500), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(500));

      await token.approve(exchange.address, toWei(100));
      await exchange.addLiquidityV2(toWei(100), { value: toWei(200) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1200));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(600));

      await exchange.removeLiquidity(toWei(600));
      expect(await getBalance(exchange.address)).to.equal(toWei(600));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(300));
    });
  });

  describe.skip("ethToTokenSwap", async () => {
    it("ethToTokenSwap", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      await exchange.connect(user).ethToTokenSwap({ value: toWei(1) });
      expect(await getBalance(exchange.address)).to.equal(toWei(1001));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(999));
      expect(await token.balanceOf(user.address)).to.equal(toWei(1));
    });
  });

  describe.skip("getTokenPrice", async () => {
    it("correct get Token Price", async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      const tokenReserve = await token.balanceOf(exchange.address);
      const etherReserve = await getBalance(exchange.address);

      expect(await exchange.getPrice(tokenReserve, etherReserve)).to.eq(1);
    });
  });

  describe.skip("getOutputAmount", async () => {
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

  describe.skip("ethToTokenSwapV2", async () => {
    it("ethToTokenSwapV2", async () => {
      await token.approve(exchange.address, toWei(4000));
      await exchange.addLiquidity(toWei(4000), { value: toWei(1000) });

      await exchange
        .connect(user)
        .ethToTokenSwapV2(toWei(3.99), { value: toWei(1) });

      console.log(toEther(await token.balanceOf(user.address)));
    });
  });

  describe("swapWithFee", async () => {
    it("swapWithFee", async () => {
      await token.approve(exchange.address, toWei(50));

      // 유동성 공급 ETH 50, GRAY 50
      await exchange.addLiquidityV2(toWei(50), { value: toWei(50) });

      // 유저 ETH 30, GRAY 18.6323713927227 스왑
      await exchange
        .connect(user)
        .ethToTokenSwapWithFee(toWei(18), { value: toWei(30) });

      // 스왑 후 유저의 GRAY 잔액: 18.6323713927227
      expect(toEther(await token.balanceOf(user.address)).toString()).to.equal(
        "18.632371392722710163"
      );

      // owner의 유동성 제거
      await exchange.removeLiquidity(toWei(50));

      // onwer의 잔고는 50 - 18.632371392722710163인 31.367628607277289837 이다.
      expect(toEther(await token.balanceOf(owner.address)).toString()).to.equal(
        "31.367628607277289837"
      );
    });
  });

  describe("tokenToTokenSwap", async () => {
    it("correct tokenToTokenSwap", async () => {
      //기본적으로 10,000개의 Ether를 가지고 있음.
      [owner, user] = await ethers.getSigners();

      const FactoryFactory = await ethers.getContractFactory("Factory");
      const factory = await FactoryFactory.deploy();
      await factory.deployed();

      //create GRAY Token
      const TokenFactory = await ethers.getContractFactory("Token");
      const token = await TokenFactory.deploy(
        "BobbyToken",
        "BOBBY",
        toWei(1010)
      ); //1000 + 10swap
      await token.deployed();

      // create FAST Token
      const TokenFactory2 = await ethers.getContractFactory("Token");
      const token2 = await TokenFactory2.deploy("JayToken", "JAY", toWei(1000));
      await token2.deployed();

      // create gray/eth pair exchange contract
      const exchangeAddress = await factory.callStatic.createExchange(
        token.address
      );
      await factory.createExchange(token.address);

      // create fast/eth pair exchange contract
      const exchange2Address = await factory.callStatic.createExchange(
        token2.address
      );
      await factory.createExchange(token2.address);

      // add liquidity 1000/1000
      await token.approve(exchangeAddress, toWei(1000));
      await token2.approve(exchange2Address, toWei(1000));
      const ExchangeFactory = await ethers.getContractFactory("Exchange");
      await ExchangeFactory.attach(exchangeAddress).addLiquidityV2(
        toWei(1000),
        {
          value: toWei(1000),
        }
      );
      await ExchangeFactory.attach(exchange2Address).addLiquidityV2(
        toWei(1000),
        {
          value: toWei(1000),
        }
      );

      // 유동성 공급을 위해 approve 한 1000개를 다 썼으니 스왑을 위해 10개 다시 approve
      await token.approve(exchangeAddress, toWei(10));
      await ExchangeFactory.attach(exchangeAddress).tokenToTokenSwap(
        toWei(10),
        toWei(9),
        toWei(9),
        token2.address
      );

      console.log(toEther(await token2.balanceOf(owner.address)));
      console.log(toEther(await token2.balanceOf(exchangeAddress)));
    });
  });
});
