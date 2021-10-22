// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Type {
  /*
  * Data type : boolean, bytes, address, uint
  * Reference type : string, Arrays, struct
  * Mapping type : mapping
  */
  
  // boolean
  bool public b = false; 
  bool public b1 = !false; //true
  bool public b2 = false || true; // true
  bool public b3 = false == true; // false
  bool public b4 = false && true; // false  

  function boolean() public view returns(bool, bool, bool, bool, bool) {
    return (b, b1, b2, b3, b4);
  }
}