// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract Variables {

    // 모든 변수는 선언시 초기값 할당 (null, undefined 없음)
    // -> uint = 0, bool = false, string = ""
    // uint 는 uint256의 줄임
    uint256 public myUint; 

    function setMyUint(uint256 _uint) public {
        myUint = _uint;
    }

    bool public myBool;

    function setMyBool(bool _bool) public {
        myBool = _bool;
    }

    uint8 public myUint8;

    function incrementUint() public {
        myUint8++;
    }

    function decrementUint() public {
        myUint8--;
    }

    // address 는 20바이트 값
    // 블록체인과 상호작용 할 수있는 함수들이 존재( .transfer(), .send(), balance, ... )
    address public myAddress;

    function setAddress(address _address) public {
        myAddress = _address;
    }

    function getBalanceOfAddress() public view returns (uint) {
        return myAddress.balance;
    }

    string public myString;

    // 참조 타입(string)은 저장 위치 선언 필요 (memory / storage) 
    // 문자열은 내부적으로 바이트배열로 저장 -> 출력시 UTF-8 로 변환
    function setMyString(string memory _string) public {
        myString = _string;
    }
}