// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Squad.sol";
import "../src/LeagueFactory.sol";
import "../src/League.sol";

contract LeagueTest is Test {
    LeagueFactory public factory;

    function setUp() public {
        factory = new LeagueFactory();
    }
    function testCreateLeague() public {
        address leagueAddress = factory.createLeague("name", "description", 4);
        console.log(leagueAddress);
        assertEq(leagueAddress, factory.leagueAddresses(0));
    }
    function testGetLeagues() public {
        factory.createLeague("name", "description", 2);
        League[] memory leagues = factory.getLeagues();
        assert(leagues.length == 1);
    }
    function testJoinLeague() public {
        address leagueAddress = factory.createLeague("name", "description", 2);
        League league = League(leagueAddress);
        league.joinLeague();
    }

}
