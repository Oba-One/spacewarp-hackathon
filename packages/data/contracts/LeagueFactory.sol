// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./League.sol";

/**
* Notes: Will only be one league hardcoded the element league
*
*/

contract LeagueFactory {
  League[] private _leagues;

  event LeagueSpawned(address newAddress);
  
  function spawnLeague(string memory _name, string memory _description, uint16 _squadsAllowed) external returns (League){
    League d = new League(_name, _description, _squadsAllowed); 
    _leagues.push(d);
    emit LeagueSpawned(address(d));
    return d;
  }

  function getLeagues() public view returns (League[] memory coll){
    return _leagues;
  }

  function getLeague(uint index) public view returns (League){
    return _leagues[index];
  }

  function getLeagueCount() public view returns (uint){
    return _leagues.length;
  }
}