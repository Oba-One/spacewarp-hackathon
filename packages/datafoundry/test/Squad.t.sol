// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Squad.sol";
import "../src/SquadFactory.sol";

contract SquadTest is Test {
        SquadFactory public factory;

    function setUp() public {
        factory = new SquadFactory();
    }
    function testCreateSquad() public {
        factory.createSquad();
        assertEq(factory.getSquads().length, 1);
    }
}
