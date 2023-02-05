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
        genCharacter(
            playerEntity,
            "the infinaut",
            "The Infinaut is a Marvel character not known by many.",
            "QmV5FZ65pSq8f3wLuVxy6dyYeJXR7L3HJxujsV1ad5tuUb",
            gameId
        );
        genCharacter(
            playerEntity,
            "america chavez",
            "America Chavez is a Marvel character most known for her time in the Ultimates.",
            "QmdXT7QQBrcvteebd7wEz2F9RJRbQBE6PzBDrkNq4dPfJC",
            gameId
        );
        genCharacter(
            playerEntity,
            "namor",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "Qme4M7CiWn5ybxUxzvYCA851xshAE4u5rw4Pj7etsDBf7J",
            gameId
        );
        genCharacter(
            playerEntity,
            "cyclops",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmVEsUnw1KHtNk81yN6aqWMSwtotz8rSZrwAu5z56rGddK",
            gameId
        );
        genCharacter(
            playerEntity,
            "blue marvel",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmaDSdQTTQwxzYkATv1izh9FE3v2DEhVm4MqvJJLNJBi7u",
            gameId
        );
        genCharacter(
            playerEntity,
            "beast",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmdwUZSVmRx6KeEoSkT7RSVkWtfRZAekHvNeaBVJJxkbW9",
            gameId
        );
        genCharacter(
            playerEntity,
            "mister fantastic",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmSKtKpQssqUjG8ZdFQ5ZoybAFrUiof2boti6q5XD2MRF1",
            gameId
        );
        genCharacter(
            playerEntity,
            "shuri",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmY9xUbEDtYLHcXRj1UQWw1hfS75bFZ1qdCntYjCGxii3g",
            gameId
        );
        genCharacter(
            playerEntity,
            "iceman",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmVP1owy23PwJ67mgvh6Uy4JHnhBRwYEuC8FjuUXJnL7dj",
            gameId
        );
        genCharacter(
            playerEntity,
            "nightcrawler",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmNUgcxjVwcmVCXzD39XuKk8j1RdJzeHg5ez1jLNTR7dFy",
            gameId
        );
        genCharacter(
            playerEntity,
            "rogue",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "QmP78diCD1qLAeNe6WScMGfESUqYQMDjN2CGGbD5csrQPG",
            gameId
        );
        genCharacter(
            playerEntity,
            "mystique",
            "Namor is a Marvel character most recently seen in Wakanda Forever.",
            "Qme4M7CiWn5ybxUxzvYCA851xshAE4u5rw4Pj7etsDBf7J",
            gameId
        );
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
