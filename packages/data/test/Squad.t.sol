// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Squad.sol";
import "../src/LeagueFactory.sol";
import "../src/League.sol";

contract LeagueTest is Test {
    LeagueFactory public factory;
    address leagueAddress;
    League public league;
    function setUp() public {
        factory = new LeagueFactory();
        leagueAddress = factory.createLeague("TestName", "TestDescription", 4);
        league = League(leagueAddress);
    }
    function testCreateSquad() public {
        uint256 squadIdIdx = league.createSquad("TestSquadBaseURI", "TestSquadContractURI");
        assertEq(league.getSquads().length, squadIdIdx + 1);
    }
    function testJoinSquad() public {
        uint256 squadIdIdx = league.createSquad("TestSquadBaseURI", "TestSquadContractURI");
        address squadAddress = league.squadAddresses(squadIdIdx);
        Squad _squad = Squad(squadAddress);
        league.joinSquad(squadIdIdx);
        assertEq(_squad.getMembers().length, 1);
    }
    function testRedeemCollectible() public {
        uint256 squadIdIdx = league.createSquad("TestSquadBaseURI", "TestSquadContractURI");
        address squadAddress = league.squadAddresses(squadIdIdx);
        Squad _squad = Squad(squadAddress);
        league.joinSquad(squadIdIdx);
        _squad.mintCollectible();
        assertEq(_squad.getCollectibles().length, 1);
    }
}
