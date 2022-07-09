// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract SendMoneyExample {

    uint public balanceReceived;

    function receiveMoney() public payable {
        balanceReceived += msg.value;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawaMoney() public {
        address payable to = payable(msg.sender);

        to.transfer(this.getBalance());
    }

    function withdrawaMoneyTo(address payable _to) public {
        _to.transfer(this.getBalance());
    }
}