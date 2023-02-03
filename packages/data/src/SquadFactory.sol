// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Squad.sol";

contract SquadFactory {
  event SquadCreated(address newAddress);

  Squad[] public _squads;

  function createSquad() public returns (Squad){
    Squad d = new Squad(); 
    _squads.push(d);
    emit SquadCreated(address(d));
    return d;
  }

  function getSquads() public view returns (Squad[] memory coll){
    return _squads;
  }

  function getSquad(uint index) public view returns (Squad) {
    return _squads[index];
  }

}