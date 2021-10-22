// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Hello {
  string public hello = "Hello Solidity!!";

  function sayHello() public view returns (string memory) {
    return hello;
  }
}