// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
import { Uint32Component } from "std-contracts/components/Uint32Component.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

import { OwnedByComponent, ID as OwnedByID } from "../components/OwnedByComponent.sol";
import { IdentityComponent, ID as IdentityID } from "../components/IdentityComponent.sol";
import { AssetComponent, ID as AssetID } from "../components/AssetComponent.sol";
import { PositionComponent, ID as PositionID } from "../components/PositionComponent.sol";

import { PositionType, AssetType } from "./MSTypes.sol";

library LibInit {
  // Inits character entity with default values
  function initCharacter(
    IUint256Component components,
    IWorld world,
    PositionType position,
    AssetType memory asset
  ) internal returns (uint256 characterEntity) {
    characterEntity = world.getUniqueEntityId();
    // @junaama TODO: temp player entity id, abstract out later to sep function
    uint256 playerEntity = world.getUniqueEntityId();

    PositionComponent(getAddressById(components, PositionID)).set(characterEntity, position);
    OwnedByComponent(getAddressById(components, OwnedByID)).set(characterEntity, playerEntity);
    AssetComponent(getAddressById(components, AssetID)).set(characterEntity, asset);
  }
}
