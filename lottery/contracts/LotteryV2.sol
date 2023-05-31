// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract LotteryV2 is VRFConsumerBaseV2 {
    address public owner;
    address payable[] public players;
    uint256 public lotteryId;
    mapping(uint256 => address) public lotteryHistory;

    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    bytes32 keyHash =
        0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;

    uint32 numWords = 1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        owner = msg.sender;
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(
            msg.value >= .01 ether,
            "msg.value should be greater than or equal to 0.01 ether"
        );
        players.push(payable(msg.sender));
    }

    function _requestRandomWords() internal {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(
        uint256,
        uint256[] memory _randomWords
    ) internal override {
        s_randomWords = _randomWords;
        _prizeWinner();
    }

    function pickWinner() public onlyOwner {
        _requestRandomWords();
    }

    function _prizeWinner() internal {
        uint256 index = s_randomWords[0] % players.length;

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;

        address payable winner = players[index];
        players = new address payable[](0);

        (bool success, ) = winner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not owner");
        _;
    }
}
