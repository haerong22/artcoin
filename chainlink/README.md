## Chain link example

---

### api request

- off chain 에 있는 데이터를 안전하게 on chain 으로 가져오는 방법

https://docs.chain.link/any-api/introduction

### ethereum goerli network

https://docs.chain.link/any-api/get-request/examples/large-responses

- chainlink address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB

- chainlink oracle address: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7

```solidity

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract GenericLargeResponse is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    bytes public data;
    string public image_url;

    bytes32 private jobId;
    uint256 private fee;

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function requestBytes() public {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillBytes.selector
        );
        req.add(
            "get",
            "https://ipfs.io/ipfs/QmZgsvrA1o1C8BGCrx6mHTqR1Ui1XqbCrtbMVrRLHtuPVD?filename=big-api-response.json"
        );
        req.add("path", "image");
        sendChainlinkRequest(req, fee);
    }

    event RequestFulfilled(bytes32 indexed requestId, bytes indexed data);

    function fulfillBytes(
        bytes32 requestId,
        bytes memory bytesData
    ) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId, bytesData);
        data = bytesData;
        image_url = string(data);
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}

```

---

### 외부 코인 가격 가져오기

https://docs.chain.link/data-feeds

- goerli network data

  https://docs.chain.link/data-feeds/price-feeds/addresses#Goerli%20Testnet

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    constructor() {
        dataFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e // ETH / USD
        );
    }

    function getLatestData() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}


```
