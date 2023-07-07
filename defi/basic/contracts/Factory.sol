//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Exchange.sol";

contract Factory {
    mapping(address => address) tokensToExchange;

    event NewExchange(address indexed token, address indexed exchange);

    function createExchange(address _token) public returns (address) {
        require(_token != address(0));
        require(tokensToExchange[_token] == address(0));
        Exchange exchange = new Exchange(_token);
        tokensToExchange[_token] = address(exchange);

        emit NewExchange(_token, address(exchange));

        return address(exchange);
    }

    function getExchange(address _token) public view returns (address) {
        return tokensToExchange[_token];
    }
}
