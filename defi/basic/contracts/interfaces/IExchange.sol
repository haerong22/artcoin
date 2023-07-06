//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IExchange {
    function ethToTokenSwapWithFee(uint256 _minTokens) external payable;

    function ethToTokenTransferWithFee(
        uint256 _minTokens,
        address _recipient
    ) external payable;
}
