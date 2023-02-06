// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/LeagueFactory.sol";

contract DeployScript is Script {
    struct BuildSquad {
        string name;
        string description;
        uint256 maxMembers;
    }

    BuildSquad[4] public squads = [
        BuildSquad("water", "Water is the coldest"),
        BuildSquad("earth", "Earth is the hardest"),
        BuildSquad("fire", "Fire is the hottest"),
        BuildSquad("air", "Air is the lightest")
    ];

    address[] public waterSquadMembers = [
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c
    ];

    address[] public earthSquadMembers = [
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c
    ];


    address[] public fireSquadMembers = [
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c
    ];

    address[] public airSquadMembers = [
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c,
        0x8c5fecdC472E27Bc447696F431E425D02dd46a8c
    ];

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FVM_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        LeagueFactory leagueFactory = new LeagueFactory();

        League WefaLeague = leagueFactory.createLeague("wefa", "Water, Earth, Fire, Air nothing can compare", 4);

        // TODO: Add deployment of Element league with 4 squads
        for (uint256 index = 0; index < squads.length; index++) {
            BuildSquad memory squad = squads[index];
            address squadAddress =  WefaLeague.createSquad(squad.name, squad.description, "", "");
            WefaLeague.enterLeague(squadAddress);            
        }

        // TODO: Use whitelist of address to add members to suads and generate match results
        // TODO: Creata an initial proposal

        vm.stopBroadcast();
        vm.broadcast();

    }

}
