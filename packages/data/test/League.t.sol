// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Squad.sol";
import "../src/SquadFactory.sol";
import "../src/LeagueFactory.sol";
import "../src/League.sol";

contract LeagueTest is Test {
    LeagueFactory public factory;

    function setUp() public {
        factory = new LeagueFactory();
    }
    function testCreateLeague() public {
        factory.createLeague("name", "description", 4);
        assertEq(factory.getLeagues().length, 1);
    }
}
