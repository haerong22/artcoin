// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract SimpleMappingExample {
    mapping(uint => bool) public myMapping;
    mapping(address => bool) public myAddressMapping;

    function setMyMappingToTrue(uint _index) public {
        myMapping[_index] = true;
    }

    function setMyAddressMappingToTrue() public {
        myAddressMapping[msg.sender] = true;
    }
}