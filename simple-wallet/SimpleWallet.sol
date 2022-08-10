// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Allowance.sol";

contract SimpleWallet is Allowance {
    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyRecieved(address indexed _from, uint _amount);

    function withdrawalMoney(address payable _to, uint _amount) public ownerOrAllowance(_amount) {
        require(_amount <= address(this).balance, "There are not enough funds stored in thre smart contract");

        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }

        emit MoneySent(_to, _amount);

        _to.transfer(_amount);
    }
    
    function renounceOwnership() public pure override {
        revert("Can't renounce ownership here");
    }

    fallback () external payable {
        emit MoneyRecieved(msg.sender, msg.value);
    }
}