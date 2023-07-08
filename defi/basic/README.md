# CSMM

```shell
yarn
yarn hardhat compile
yarn hardhat test test/Exchange.ts
```

# interface 활용

- uniswap V2 interface 활용하기
- goerli network

```solidity
interface IUniswapCaller {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

contract UniswapCaller {

    function getPair() public view returns (address) {
        return IUniswapCaller(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f).getPair(
            0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6,
            0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
        );
    }

    function getPrice(address pairAddress) public view returns (uint112, uint112, uint32) {
        return IUniswapCaller(pairAddress).getReserves();
    }
}
```

# 배포

```shell
yarn hardhat run scripts/deploy.ts --network goerli
```

# 검증

```shell
yarn hardhat verify --network goerli {contract address} {constructor params}
```
