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
import {ZoneComponent, ID as ZoneID} from "../components/ZoneComponent.sol";

// Library
import {IdentityType, PositionEnum, MatchType, ZoneEnum} from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("system.Init"));

contract InitSystem is System {
    constructor(IWorld _world, address _components) System(_world, _components) {}

    function execute(bytes memory arguments) public override returns (bytes memory) {
        // Generate match
        // uint256 gameId = LibInit.initPlayer(msg.sender);
        (uint256 gameId, uint256 teamId, uint256 playerNum) = abi.decode(arguments, (uint256, uint256, uint256));
        genMatch(gameId, playerNum);

        // Generate player 1
        uint256 playerEntity = genPlayer(gameId, playerNum);

        // Generate characters
        genCharacters(playerEntity, gameId, teamId);
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function genMatch(uint256 gameId, uint256 playerNum) private {
        MatchComponent matchComponent = MatchComponent(getAddressById(components, MatchID));
        uint256 startedAt = 0;
        // Client knows the match has started when startedAt > 0
        if (playerNum == 2) {
            startedAt = 1;
        }
        matchComponent.set(gameId, MatchType({startedAt: startedAt, finishedAt: 0, turnsLeft: 5}));
    }

    function genPlayer(uint256 gameId, uint256 playerNum) private returns (uint256) {
        uint256 playerEntity = LibInit.initPlayer(msg.sender);
        string memory name = string.concat("Player ", uint2str(playerNum));
        IdentityType memory playerIdentity = IdentityType({name: name, description: "A player in the game"});
        IdentityComponent(getAddressById(components, IdentityID)).set(playerEntity, playerIdentity);
        OwnedByComponent(getAddressById(components, OwnedByID)).set(playerEntity, gameId);

        return playerEntity;
    }

    function genCharacters(uint256 playerEntity, uint256 gameId, uint256 teamId) private {
        if (teamId == 1) {
            genWaterCharacters(playerEntity, gameId);
        } else if (teamId == 2) {
            genEarthCharacters(playerEntity, gameId);
        } else if (teamId == 3) {
            genFireCharacters(playerEntity, gameId);
        } else if (teamId == 4) {
            genAirCharacters(playerEntity, gameId);
        }
    }

    function genEarthCharacters(uint256 playerEntity, uint256 gameId) private {
        genCharacter(
            playerEntity,
            "hulk",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmPb271d6uuwBFA3j4tuTLt9KVtmV67vQVVuEyZf2BDBuU",
            gameId
        );
        genCharacter(
            playerEntity,
            "nick fury",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmSrey9PwVDBAXL63VM3dG9DqX8yV4uxxQeh1sdCwE5nrd",
            gameId
        );
        genCharacter(
            playerEntity,
            "the thing",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmWY1ofTPTfxAdvHaMLwCgn4h6rLczfEVtdZU5zNCjPiUE",
            gameId
        );
        genCharacter(
            playerEntity,
            "ultron",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmXxHggF5eTwAF1wP1qkJWvDpHiVREUjLF9iwdEd2ftuka",
            gameId
        );
        genCharacter(
            playerEntity,
            "jessica jones",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmatK1JVhYkoFG4py5aJxHhwuFYVPWJpCC5gwwQmVRhNGs",
            gameId
        );
        genCharacter(
            playerEntity,
            "wolverine",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmPDsNehHPdb5SPWR3vRgukkWL5mJJdwSMaXA4LzB6jRUJ",
            gameId
        );
        genCharacter(
            playerEntity,
            "black panther",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmQDdXVMUfsct3eDzw85mMcTq5rJ5TW3TRZzZ9bheE3HTq",
            gameId
        );
        genCharacter(
            playerEntity,
            "professor x",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmeeiPNbG89Hk33By4L9hMm54aqfUn5FrA1kq3Q7zfj6Db",
            gameId
        );
        genCharacter(
            playerEntity,
            "captain america",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmYbRVbXjdUF1AceDVCHCCY5HE7mDVM5gS8dL7jPjxx2AR",
            gameId
        );
        genCharacter(
            playerEntity,
            "okoye",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmWFtozjHAuE7DAs58HrKd8rwvkwQvkrwkKVt93u6Ek7s4",
            gameId
        );
        genCharacter(
            playerEntity,
            "deadpool",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmUH5N2NskvqU8Tmd486PbvvpVFY3FNtagC6YmahofHpZa",
            gameId
        );
        genCharacter(
            playerEntity,
            "antman",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmTA8bqkYFp2LneAxkSs36MKGCoCYsWQPWCSQpmEnGU2cZ",
            gameId
        );
    }

    function genFireCharacters(uint256 playerEntity, uint256 gameId) private {
        genCharacter(
            playerEntity,
            "agatha harkness",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmQ7YQtv9aV8xhk1TAUmhDycwkVx4Kzm9jZn8xNvTCsxkN",
            gameId
        );
        genCharacter(
            playerEntity,
            "hela",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmVhNgfcM7ejUHztKHqAgJpezmM6aJQ364R8mmHAbbxezY",
            gameId
        );
        genCharacter(
            playerEntity,
            "gamora",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmPKqQRSKUSsw7CSDVk9mVrtksdeK5mzyvgMLfmzKNh6ZQ",
            gameId
        );
        genCharacter(
            playerEntity,
            "doctor doom",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmfCUo7wkTFvhcq7nQWez1hWGwshjrDmeMmcA3MM8BPh3T",
            gameId
        );
        genCharacter(
            playerEntity,
            "enchantress",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmZTmZ573EPN4Nsfgi24WN5YsEnDojz63UHNmdG8jvpb8c",
            gameId
        );
        genCharacter(
            playerEntity,
            "moon knight",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmPaHN9HdeW3EtRCMQw7NZYQYoCCvLDoc7sZMQFQZT2bER",
            gameId
        );
        genCharacter(
            playerEntity,
            "green goblin",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmWZUX2XkYTt3GcQmrY3pcR5UzxLFWKUAoyTPwoyCCm1eQ",
            gameId
        );
        genCharacter(
            playerEntity,
            "blade",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmUwfKkMsSHkjGRy73u4UJJgvKFTc8Zcp9RPmFDuMfzAuD",
            gameId
        );
        genCharacter(
            playerEntity,
            "daredevil",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmcAipoMGQxUrkjvgyxB3sV7Y2etbs23uxfNWDkQFjkQHq",
            gameId
        );
        genCharacter(
            playerEntity,
            "punisher",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmRbqeqtTiNVhr71eV637r7SWEAugUqma5M6EHqWFTPaGd",
            gameId
        );
        genCharacter(
            playerEntity,
            "human torch",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmdMQGqr6bUmfrVNnPPtHjwNb8SBxZa4xWqGzkfweNxMKG",
            gameId
        );
        genCharacter(
            playerEntity,
            "black widow",
            "The Hulk is a Marvel character most known for his time in the Avengers.",
            "QmX4AByqQktcrvc4RzM4cpQA9np8cP8RMFubcLty6d9YBL",
            gameId
        );
    }

    function genAirCharacters(uint256 playerEntity, uint256 gameId) private {
        genCharacter(
            playerEntity,
            "magneto",
            "Magneto the ever plotting villan, who believes that humans and mutants should be seperated.",
            "QmPeftXiRhwSBmmSqw4wujm4KXD7o7BswsWt8LQgXTrfou",
            gameId
        );
        genCharacter(
            playerEntity,
            "thanos",
            "Thanos obssessed with the idea of balance, he will stop at nothing to get the infinity stones.",
            "QmbcKJvZbgnUWuE28wZ89fiPHad7FhXTuGM39L2HDBkxpE",
            gameId
        );
        genCharacter(
            playerEntity,
            "vision",
            "Vision is a android made from Ultron, Jarvis, and the Mind Stone.",
            "QmQSsuVKUpuwedxK3fxFBsQVM3DgQCTJwk8L57kA6P9YVj",
            gameId
        );
        genCharacter(
            playerEntity,
            "miles morales",
            "Miles Morales is a young spiderman who is trying to make a name for himself.",
            "QmaeCTXfr21TQsEF4wcsUkPnhWFBx9FUKm1yQadxquJGcE",
            gameId
        );
        genCharacter(
            playerEntity,
            "thor",
            "Thor is the God of Thunder, and the son of Odin.",
            "QmZmSEeP8FquHR7tcTr1c476vcGjFieCoSZRpg4YzM9JAg",
            gameId
        );
        genCharacter(
            playerEntity,
            "doctor strange",
            "Doctor Strange is a master of the mystic arts, and is the Sorcerer Supreme.",
            "QmNyDMsrup9CZqF3HUQqfciBJqxBXeMKLaRdMdByS5UpCs",
            gameId
        );
        genCharacter(
            playerEntity,
            "scarlett witch",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmaSkJpBWLtZfNCYyxBv4AVnaEybwQSre3xbQi7LiuPtV1",
            gameId
        );
        genCharacter(
            playerEntity,
            "galactus",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmPVTatRYvcY4JJyioJNYdrWZQS48RUkobhUdNVmyqmybX",
            gameId
        );
        genCharacter(
            playerEntity,
            "storm",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmUhevMgF18eFx5cf1erQVYCjnxZ3wJ23wT86qtWnMyDdS",
            gameId
        );
        genCharacter(
            playerEntity,
            "starlord",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmYqGdi2okEf8BCWejF1n8roeHTt7wHWA6iKK3EYwotvGH",
            gameId
        );
        genCharacter(
            playerEntity,
            "vatu the watcher",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmZwNTcJUqghctvngV3NSc4izgaUwfzK4qhwKqk9wpDG5H",
            gameId
        );
        genCharacter(
            playerEntity,
            "wasp",
            "Scarlett Witch is a mutant with the ability to manipulate reality.",
            "QmUbdQA5dg9ZwAb1VGoSmVQ3z3AsCoq6FSmcqDFic3e9fZ",
            gameId
        );
    }

    function genWaterCharacters(uint256 playerEntity, uint256 gameId) private {
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
        uint256 characterEntity = world.getUniqueEntityId();

        // Set position (deck)
        PositionEnum position = PositionEnum.Hand;
        PositionComponent(getAddressById(components, PositionID)).set(characterEntity, position);

        // Set zone (E)
        ZoneEnum zone = ZoneEnum.E;
        ZoneComponent(getAddressById(components, ZoneID)).set(characterEntity, zone);

        // Set identity & asset
        IdentityType memory identity1 = IdentityType({name: name, description: description});
        IdentityComponent(getAddressById(components, IdentityID)).set(characterEntity, identity1);
        AssetComponent(getAddressById(components, AssetID)).set(characterEntity, imgUri);

        // Ownership and ingame relation
        OwnedByComponent(getAddressById(components, OwnedByID)).set(characterEntity, playerEntity);
        InGameComponent(getAddressById(components, InGameID)).set(characterEntity, gameId);
    }

    function executeTyped(uint256 gameId, uint256 teamId, uint256 playerNum) public returns (bytes memory) {
        return execute(abi.encode(gameId, teamId, playerNum));
    }
}
