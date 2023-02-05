// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/LeagueFactory.sol";

contract DeployScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FVM_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        LeagueFactory factory = new LeagueFactory();
        vm.stopBroadcast();
        vm.broadcast();

    }
}
