pragma solidity >=0.8.0;

import "std-contracts/test/MudTest.t.sol";

import {console} from "forge-std/console.sol";
import {Coord} from "std-contracts/components/CoordComponent.sol";
import {Deploy} from "./Deploy.sol";

contract MudSnapTest is MudTest {
    constructor(IDeploy deploy) MudTest(deploy) {}

    modifier prank(address prankster) {
        vm.startPrank(prankster);
        _;
        vm.stopPrank();
    }

    function 


}
