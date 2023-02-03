// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Squad.sol";

contract SquadFactory {
  Squad[] private _squads;

  event SquadSpawned(address newAddress);
  
  function spawnSquad() public returns (Squad){
    Squad d = new Squad(); 
    _squads.push(d);
    emit SquadSpawned(address(d));
    return d;
  }

  function getSquads() public view returns (Squad[] memory coll){
    return _squads;
  }

  function getSquad(uint index) public view returns (Squad){
    return _squads[index];
  }

  function getSquadCount() public view returns (uint){
    return _squads.length;
  }


  

}