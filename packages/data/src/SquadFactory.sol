// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Squad.sol";

contract SquadFactory {
  event SquadCreated(address newAddress);

  Squad[] public _squads;

  modifier notInOtherSquad(){
    for(uint i = 0; i < _squads.length; i++){
      Squad squad = _squads[i];
      require(squad.isMember(msg.sender) == false, "Already in a squad");
    }
    _;
  }

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

  function joinSquad(uint index) notInOtherSquad public {
    require(index <= _squads.length, "Squad does not exist");
    Squad squad = _squads[index];
    squad.joinSquad();
  }
}