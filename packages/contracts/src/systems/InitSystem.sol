// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System, IWorld} from "solecs/System.sol";
import {getAddressById} from "solecs/utils.sol";
import {LibInit} from "libraries/LibInit.sol";

// Compoonents
import {OwnedByComponent, ID as OwnedByID} from "../components/OwnedByComponent.sol";
import {IdentityComponent, ID as IdentityID} from "../components/IdentityComponent.sol";
import {AssetComponent, ID as AssetID} from "../components/AssetComponent.sol";
import {PositionComponent, ID as PositionID} from "../components/PositionComponent.sol";
import {MatchComponent, ID as MatchID} from "../components/MatchComponent.sol";
import {InGameComponent, ID as InGameID} from "../components/InGameComponent.sol";

// Library
import {IdentityType, PositionEnum, MatchType} from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("system.Init"));

contract InitSystem is System {
    constructor(IWorld _world, address _components) System(_world, _components) {}

    function execute(bytes memory arguments) public override returns (bytes memory) {
        // Generate match
        // uint256 gameId = LibInit.initPlayer(msg.sender);
        (uint256 gameId) = abi.decode(arguments, (uint256));
        genMatch(gameId);

        // Generate player 1
        uint256 playerEntity = genPlayer(gameId);

        // Generate characters
        genCharacters(playerEntity, gameId);
    }

    function genMatch(uint256 gameId) private {
        MatchComponent matchComponent = MatchComponent(getAddressById(components, MatchID));
        matchComponent.set(gameId, MatchType({startedAt: 0, finishedAt: 1, turnsLeft: 5}));
    }

    function genPlayer(uint256 gameId) private returns (uint256) {
        uint256 playerEntity = LibInit.initPlayer(msg.sender);
        IdentityType memory playerIdentity =
            IdentityType({name: "Player 1", description: "The one who create the game"});
        IdentityComponent(getAddressById(components, IdentityID)).set(playerEntity, playerIdentity);
        OwnedByComponent(getAddressById(components, OwnedByID)).set(playerEntity, gameId);

        return playerEntity;
    }

    function genCharacters(uint256 playerEntity, uint256 gameId) private {
        genCharacter(playerEntity, "America Chavez", "1", "QmerXkUqbixUfy47YHusPBVTd2CPDBgpmHVtxiyC9n31NN", gameId);
        genCharacter(playerEntity, "Ant Man", "3", "QmW7q4QxyYC6mFZniU7SqXPivSsijNCt6kWDQWxiWpyDK3", gameId);
        genCharacter(playerEntity, "Apocalypse", "4", "Qme9uezkeVaRZ8Qo2N16duFCsmGZjXiXt2tkPH6KZUV3n7", gameId);
        genCharacter(playerEntity, "Black Bolt", "5", "QmZRTKS5iBULdk3u1Sm69MVyEaPe1evcnUFfWaYj4cA7av", gameId);
        genCharacter(playerEntity, "Captain Marvel", "6", "QmYc7CYd2wpiY69PdzWrsZjrUum69GDvzt24YpRFUmhr8U", gameId);
        genCharacter(playerEntity, "Thanos", "7", "QmVRKmufiSDogoQh6c1heFbCvUTSgu6xctycTb5jyoCcm1", gameId);
        genCharacter(playerEntity, "Professor X.", "8", "QmNe4AbGkyyaoKjLdE6jpiyuMjisiPeGAQ2NA7TigW1p5E", gameId);
    }

    function genCharacter(
        uint256 playerEntity,
        string memory name,
        string memory description,
        string memory imgUri,
        uint256 gameId
    ) private {
        IdentityType memory identity1 = IdentityType({name: name, description: description});
        PositionEnum position = PositionEnum.Deck;
        uint256 characterEntity = world.getUniqueEntityId();

        PositionComponent(getAddressById(components, PositionID)).set(characterEntity, position);
        OwnedByComponent(getAddressById(components, OwnedByID)).set(characterEntity, playerEntity);
        AssetComponent(getAddressById(components, AssetID)).set(characterEntity, imgUri);
        IdentityComponent(getAddressById(components, IdentityID)).set(characterEntity, identity1);
        InGameComponent(getAddressById(components, InGameID)).set(characterEntity, gameId);
    }

    function executeTyped(uint256 gameId) public returns (bytes memory) {
        return execute(abi.encode(gameId));
    }
}
