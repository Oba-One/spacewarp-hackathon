// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Squad.sol";
import "../src/LeagueFactory.sol";
import "../src/League.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";
contract LeagueTest is Test {
    LeagueFactory public factory;
    address leagueAddress;
    League public league;
    bytes32 public constant DEFAULT_ADMIN_ROLE = keccak256("DEFAULT_ADMIN_ROLE");
    bytes32 public constant LEAGUE_MEMBER = keccak256("LEAGUE_MEMBER");

    IAccessControl private accessControl;

    function setUp() public {
        factory = new LeagueFactory();
        leagueAddress = factory.createLeague("TestName", "TestDescription", 4);
        league = League(leagueAddress);
    }
    // @junaama TODO: evm revert errors
    function testCreateSquad() public {
        assertTrue(accessControl.hasRole(DEFAULT_ADMIN_ROLE, address(this)));
        uint256 squadIdIdx = league.createSquad("SquadName", "SquadDescription", "TestSquadBaseURI", "TestSquadContractURI");
        assertEq(league.getSquads().length, squadIdIdx + 1);
    }
    function testJoinSquad() public {
        assertTrue(accessControl.hasRole(DEFAULT_ADMIN_ROLE, address(this)));
        uint256 squadIdIdx = league.createSquad("SquadName", "SquadDescription", "TestSquadBaseURI", "TestSquadContractURI");
        address squadAddress = league.squadAddresses(squadIdIdx);
        Squad _squad = Squad(squadAddress);
        league.joinSquad(squadIdIdx);
        assertEq(_squad.getMembers().length, 1);
    }
    function testRedeemCollectible() public {
        assertTrue(accessControl.hasRole(DEFAULT_ADMIN_ROLE, address(this)));
        uint256 squadIdIdx = league.createSquad("SquadName", "SquadDescription", "TestSquadBaseURI", "TestSquadContractURI");
        address squadAddress = league.squadAddresses(squadIdIdx);
        Squad _squad = Squad(squadAddress);
        league.joinSquad(squadIdIdx);
        _squad.redeemCollectible();
        // @junaama TODO: test that squad.getCollectibleEarned of addy = this addy
    }

    function testGetSquadInfo() public {
        uint256 squadIdIdx = league.createSquad("TestName", "TestDescription", "TestSquadBaseURI", "TestSquadContractURI");
        address squadAddress = league.squadAddresses(squadIdIdx);
        Squad _squad = Squad(squadAddress);
        // @junaama TODO: failing assertion
        assertEq(_squad.getSquadInfo(),keccak256(abi.encodePacked(squadIdIdx, "TestName", "TestDescription")));
    }

    // TODO: Tests for proposal creation, voting, execution, etc.
}
