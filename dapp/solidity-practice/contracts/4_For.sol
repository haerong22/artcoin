// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract For {
    event nowNumber(uint num);

    function call() public {
        uint num = 5;

        for(uint i=0; i < 10; i++) {
            num = num + 1;
            emit nowNumber(num);
        }
    }
}