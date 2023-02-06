// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Squad.sol";

contract SquadFactory {
    event SquadCreated(address newAddress, uint256 squadId);

    // Squad id to squad address
    mapping(uint256 => address) public squadAddresses;
    Squad[] public squads;

    function getSquads() public view returns (Squad[] memory) {
        return squads;
    }

    function createSquad(
        string memory _squadName, 
        string memory _squadDescription, 
        string memory _baseURI, 
        string memory _contractURI
    ) public returns (address){
        Squad newSquad = new Squad(_squadName, _squadDescription, _baseURI, _contractURI); 
        uint256 index = squads.length + 1;
        squads.push(newSquad);
        squadAddresses[index] = address(newSquad);
        emit SquadCreated(address(newSquad), index);
        return address(newSquad);
    }
}