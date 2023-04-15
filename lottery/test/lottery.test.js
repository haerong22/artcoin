const Lottery = artifacts.require("Lottery");
const should = require("chai").should();
const truffleAssert = require("truffle-assertions");

contract("Lottery", (accounts) => {
  console.log(accounts);

  let lottery;

  before(async () => {
    lottery = await Lottery.deployed();
    console.log(lottery.address);
  });

  describe("Constructor", () => {
    it("Owner should be set to accounts[0]", async () => {
      const owner = await lottery.owner();
      assert.equal(owner, accounts[0]);
      expect(owner).to.equal(accounts[0]);
      owner.should.equal(accounts[0]);
    });
  });

  describe("Enter", () => {
    it("Should revert if a player enters less then 0.01 ether", async () => {
      const enterAmt = web3.utils.toWei("0.009", "ether");
      console.log(`enterAmt: ${enterAmt}`);

      await truffleAssert.reverts(
        lottery.enter({ from: accounts[1], value: enterAmt })
      );
    });

    it("Enter 5 players and check values", async () => {
      const enterAmt = web3.utils.toWei("0.01", "ether");

      // player 1
      await lottery.enter({ from: accounts[1], value: enterAmt });

      assert.equal(await lottery.getBalance(), enterAmt);
      assert.deepEqual(await lottery.getPlayers(), [accounts[1]]);
      expect((await lottery.getBalance()).toString()).to.equal(enterAmt);
      expect(await lottery.getPlayers()).to.deep.equal([accounts[1]]);

      (await lottery.getBalance()).toString().should.equal(enterAmt);
      (await lottery.getPlayers()).should.deep.equal([accounts[1]]);

      // player 2
      await lottery.enter({ from: accounts[2], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(2)).toString()
      );
      assert.deepEqual(await lottery.getPlayers(), [accounts[1], accounts[2]]);

      // player 3
      await lottery.enter({ from: accounts[3], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(3)).toString()
      );
      assert.deepEqual(await lottery.getPlayers(), [
        accounts[1],
        accounts[2],
        accounts[3],
      ]);

      // player 4
      await lottery.enter({ from: accounts[4], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(4)).toString()
      );
      assert.deepEqual(await lottery.getPlayers(), [
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[4],
      ]);

      // player 4
      await lottery.enter({ from: accounts[5], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(5)).toString()
      );
      assert.deepEqual(await lottery.getPlayers(), [
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[4],
        accounts[5],
      ]);
    });
  });

  describe("PickWinner", () => {
    it("Should revert if pickWinner is called by not owner", async () => {
      // owner : accounts[0]
      await truffleAssert.reverts(lottery.pickWinner({ from: accounts[1] }));
    });

    it("PickWinner", async () => {
      console.log(">>> before pickWinner");

      // check players ETH balance before pickWinner
      const account_balance_before_1 = await web3.eth.getBalance(accounts[1]);
      console.log(
        `account1's ETH balance: ${account_balance_before_1 / 10 ** 18}`
      );
      const account_balance_before_2 = await web3.eth.getBalance(accounts[2]);
      console.log(
        `account2's ETH balance: ${account_balance_before_2 / 10 ** 18}`
      );
      const account_balance_before_3 = await web3.eth.getBalance(accounts[3]);
      console.log(
        `account3's ETH balance: ${account_balance_before_3 / 10 ** 18}`
      );
      const account_balance_before_4 = await web3.eth.getBalance(accounts[4]);
      console.log(
        `account4's ETH balance: ${account_balance_before_4 / 10 ** 18}`
      );
      const account_balance_before_5 = await web3.eth.getBalance(accounts[5]);
      console.log(
        `account5's ETH balance: ${account_balance_before_5 / 10 ** 18}`
      );

      console.log(">>> pickWinner");
      await lottery.pickWinner();

      console.log(">>> after pickWinner");

      const lotteryId = await lottery.lotteryId();
      console.log(`lotteryId: ${lotteryId}`);
      assert.equal(lotteryId, 1);

      const winner = await lottery.lotteryHistory(lotteryId - 1);
      console.log(`winner at lotteryId ${lotteryId - 1}: ${winner}`);

      const account_balance_after_1 = await web3.eth.getBalance(accounts[1]);
      console.log(
        `account1's ETH balancd: ${account_balance_after_1 / 10 ** 18}`
      );

      const account_balance_after_2 = await web3.eth.getBalance(accounts[2]);
      console.log(
        `account2's ETH balancd: ${account_balance_after_2 / 10 ** 18}`
      );

      const account_balance_after_3 = await web3.eth.getBalance(accounts[3]);
      console.log(
        `account3's ETH balancd: ${account_balance_after_3 / 10 ** 18}`
      );

      const account_balance_after_4 = await web3.eth.getBalance(accounts[4]);
      console.log(
        `account4's ETH balancd: ${account_balance_after_4 / 10 ** 18}`
      );

      const account_balance_after_5 = await web3.eth.getBalance(accounts[5]);
      console.log(
        `account5's ETH balancd: ${account_balance_after_5 / 10 ** 18}`
      );

      console.log(
        `account1 balance difference: ${web3.utils
          .toBN(account_balance_after_1)
          .sub(web3.utils.toBN(account_balance_before_1))}`
      );

      console.log(
        `account2 balance difference: ${web3.utils
          .toBN(account_balance_after_2)
          .sub(web3.utils.toBN(account_balance_before_2))}`
      );

      console.log(
        `account2 balance difference: ${web3.utils
          .toBN(account_balance_after_3)
          .sub(web3.utils.toBN(account_balance_before_3))}`
      );

      console.log(
        `account2 balance difference: ${web3.utils
          .toBN(account_balance_after_4)
          .sub(web3.utils.toBN(account_balance_before_4))}`
      );

      console.log(
        `account2 balance difference: ${web3.utils
          .toBN(account_balance_after_5)
          .sub(web3.utils.toBN(account_balance_before_5))}`
      );
    });

    it.skip("Calculate winner - getRandomNumber", async () => {
      const lotteryId = await lottery.lotteryId();

      const winner = await lottery.lotteryHistory(lotteryId - 1);

      const randomNum = await lottery.getRandomNumber();
      console.log(`random number: ${randomNum}`);

      const blockNumber = await web3.eth.getBlockNumber();
      console.log(`block number: ${blockNumber}`);

      const currentBlock = await web3.eth.getBlock(blockNumber);
      console.log(`current block: ${currentBlock}`);

      const calculatedRandomNum = web3.utils
        .toBN(
          web3.utils.keccak256(
            web3.utils.encodePacked(
              { value: await lottery.owner(), type: "address" },
              { value: currentBlock.timestamp, type: "uint256" }
            )
          )
        )
        .toString();

      console.log(`calculated random number: ${calculatedRandomNum}`);

      assert.equal(randomNum, calculatedRandomNum);

      const calculatedWinnerIndex = web3.utils
        .toBN(calculatedRandomNum)
        .mod(web3.utils.toBN(5))
        .toString();

      console.log(`calculated winner index: ${calculatedWinnerIndex}`);

      assert.equal(winner, accounts[Number(calculatedWinnerIndex) + 1]);
    });

    it.skip("Calculate winner - getRandomNumber2", async () => {
      const lotteryId = await lottery.lotteryId();

      const winner = await lottery.lotteryHistory(lotteryId - 1);

      const blockNumber = await web3.eth.getBlockNumber();
      console.log(`block number: ${blockNumber}`);

      const currentBlock = await web3.eth.getBlock(blockNumber);
      console.log(`current block: ${currentBlock}`);

      const calculatedRandomNum = web3.utils
        .toBN(
          web3.utils.keccak256(
            web3.utils.encodePacked(
              { value: currentBlock.difficulty, type: "uint256" },
              { value: currentBlock.timestamp, type: "uint256" },
              {
                value: [
                  accounts[1],
                  accounts[2],
                  accounts[3],
                  accounts[4],
                  accounts[5],
                ],
                type: "address[]",
              }
            )
          )
        )
        .toString();

      console.log(`calculated random number: ${calculatedRandomNum}`);

      const calculatedWinnerIndex = web3.utils
        .toBN(calculatedRandomNum)
        .mod(web3.utils.toBN(5))
        .toString();

      console.log(`calculated winner index: ${calculatedWinnerIndex}`);

      assert.equal(winner, accounts[Number(calculatedWinnerIndex) + 1]);
    });

    it("Calculate winner - getRandomNumber3", async () => {
      const lotteryId = await lottery.lotteryId();

      const winner = await lottery.lotteryHistory(lotteryId - 1);

      const randomNum = await lottery.getRandomNumber3();
      console.log(`random number: ${randomNum}`);

      const blockNumber = await web3.eth.getBlockNumber();
      console.log(`block number: ${blockNumber}`);

      const currentBlock = await web3.eth.getBlock(blockNumber);
      console.log(`current block: ${currentBlock}`);

      const calculatedRandomNum = web3.utils
        .toBN(
          web3.utils.keccak256(
            web3.utils.encodePacked(
              { value: currentBlock.parentHash, type: "bytes32" },
              { value: currentBlock.timestamp, type: "uint256" }
            )
          )
        )
        .toString();

      console.log(`calculated random number: ${calculatedRandomNum}`);

      assert.equal(randomNum, calculatedRandomNum);

      const calculatedWinnerIndex = web3.utils
        .toBN(calculatedRandomNum)
        .mod(web3.utils.toBN(5))
        .toString();

      console.log(`calculated winner index: ${calculatedWinnerIndex}`);

      assert.equal(winner, accounts[Number(calculatedWinnerIndex) + 1]);
    });
  });
});
