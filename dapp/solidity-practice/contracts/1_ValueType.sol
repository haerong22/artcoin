// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract ValueType {
    uint public    a = 24557867; // 양수만
    int public     b = -27462;  // 음수 가능
    bool public    c = true;
    address public d = 0x1111111111111111111111111111111111111111;
    string public  e = "admin"; // string 의 경우 byte32 보다 가스비가 높다.
    bytes32 public f = "admin";
    bytes[] public g;
}