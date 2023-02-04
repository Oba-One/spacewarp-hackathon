// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./League.sol";

contract LeagueFactory {
    // League id to league address
    mapping(uint256 => address) public leagueAddresses;
    League[] public leagues;
    constructor() {}

    function getLeagues() public view returns (League[] memory) {
        return leagues;
    }

    function createLeague(string memory _name, string memory _description, uint256 _squadCount) public returns (address) {
        League league = new League(_name, _description, _squadCount);
        leagues.push(league);
        leagueAddresses[leagues.length - 1] = address(league);
        return address(league);
    }
}