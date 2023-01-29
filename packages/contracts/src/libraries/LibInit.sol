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

import { PositionType, IdentityType } from "./MSTypes.sol";

library LibInit {
  // Inits game with player with a few characters
  function init(IWorld _world, IUint256Component components, uint256 playerEntity) public {
    IdentityType memory identity1 = IdentityType({ name: "Character", description: "A character entity" });
    // @junaama TODO: remove hardcoding later
    string
      memory asset1 = "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    initCharacter(components, _world, asset1, identity1, playerEntity);
  }

  // @junaama TODO: add components and add to PlayerComponent
  function initPlayer(address playerAddress) internal returns (uint256 playerEntity) {
    playerEntity = addressToEntity(playerAddress);
  }

  // Inits character entity with default values
  function initCharacter(
    IUint256Component components,
    IWorld world,
    string memory assetValue,
    IdentityType memory identity,
    uint256 playerEntity
  ) internal returns (uint256 characterEntity) {
    characterEntity = world.getUniqueEntityId();
    PositionType position = PositionType.Deck;

    PositionComponent(getAddressById(components, PositionID)).set(characterEntity, position);
    OwnedByComponent(getAddressById(components, OwnedByID)).set(characterEntity, playerEntity);
    AssetComponent(getAddressById(components, AssetID)).set(characterEntity, assetValue);
    IdentityComponent(getAddressById(components, IdentityID)).set(characterEntity, identity);
  }
}
