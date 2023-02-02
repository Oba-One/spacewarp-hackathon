// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Team.sol";

contract TeamFactory {
  event ContractCreated(address newAddress);
  Team[] private _teams;
  function createKangaroo() public returns (Team){
    Team d = new Team(); 
    _teams.push(d);
    emit ContractCreated(address(d));
    return d;
  }

  function allFoundations()
        public
        view 
        returns (Team[] memory coll)
    {
        return _teams;
    }
}