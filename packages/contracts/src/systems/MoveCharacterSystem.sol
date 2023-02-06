// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { LibInit } from "libraries/LibInit.sol";

// Compoonents
import { OwnedByComponent, ID as OwnedByID } from "../components/OwnedByComponent.sol";
import { IdentityComponent, ID as IdentityID } from "../components/IdentityComponent.sol";
import { AssetComponent, ID as AssetID } from "../components/AssetComponent.sol";
import { PositionComponent, ID as PositionID } from "../components/PositionComponent.sol";
import { MatchComponent, ID as MatchID } from "../components/MatchComponent.sol";
import { InGameComponent, ID as InGameID } from "../components/InGameComponent.sol";
import { ZoneComponent, ID as ZoneID } from "../components/ZoneComponent.sol";

// Library
import { IdentityType, PositionEnum, MatchType, ZoneEnum } from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("system.MoveCharacterSystem"));

contract MoveCharacterSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public override returns (bytes memory) {
    // check that player's phase is 0 (action)
    // if so, switch to phase1

    (uint256 characterId, uint256 positionId, uint256 zoneId) = abi.decode(arguments, (uint256, uint256, uint256));

    // update characters's position
    // Set position (deck)
    PositionEnum position = PositionEnum.Hand;
    if (positionId == 1) {
      position = PositionEnum.Location1;
    } else if (positionId == 2) {
      position = PositionEnum.Location2;
    } else if (positionId == 3) {
      position = PositionEnum.Location3;
    }
    PositionComponent(getAddressById(components, PositionID)).set(characterId, position);

    // Set zone (E)
    ZoneEnum zone = ZoneEnum.E;
    if (zoneId == 1) {
      zone = ZoneEnum.A;
    } else if (zoneId == 2) {
      zone = ZoneEnum.B;
    } else if (zoneId == 3) {
      zone = ZoneEnum.C;
    } else if (zoneId == 4) {
      zone = ZoneEnum.D;
    }
    ZoneComponent(getAddressById(components, ZoneID)).set(characterId, zone);
    // update characters's zone

    // if both players are in phase 1, switch to phase 0
  }

  function executeTyped(
    uint256 characterId,
    uint256 positionId,
    uint256 zoneId
  ) public returns (bytes memory) {
    return execute(abi.encode(characterId, positionId, zoneId));
  }
}
