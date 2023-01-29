// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { Uint32Component } from "std-contracts/components/Uint32Component.sol";
import { OwnedByComponent, ID as OwnedByID } from "../components/OwnedByComponent.sol";
import { IdentityComponent, ID as IdentityID } from "../components/IdentityComponent.sol";
import { AssetComponent, ID as AssetID } from "../components/AssetComponent.sol";
import { PositionComponent, ID as PositionID } from "../components/PositionComponent.sol";
import { PositionType, IdentityType } from "./MSTypes.sol";

library LibInit {
  /**
   * @notice initializes world with player owning a few characters
   * @param _world global world address
   * @param components components in world
   * @param playerEntity entity id of current player address
   */
  function init(IWorld _world, IUint256Component components, uint256 playerEntity) public {
    IdentityType memory identity1 = IdentityType({ name: "SpiderMan1", description: "Spiderman One" });
    IdentityType memory identity2 = IdentityType({ name: "SpiderMan2", description: "Spiderman Two" });
    // @junaama TODO: remove hardcoding later
    string
      memory asset = "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    initCharacter(components, _world, asset, identity1, playerEntity);
    initCharacter(components, _world, asset, identity2, playerEntity);
  }

  /**
   * @notice initializes player entity with default values
   * @param playerAddress address of player
   * @return playerEntity entity id of player
   */
  function initPlayer(address playerAddress) internal returns (uint256 playerEntity) {
    playerEntity = addressToEntity(playerAddress);
    // @junaama TODO: add components and add to PlayerComponent
  }

  /**
   * @notice initializes character entity with default values
   * @param components components in world
   * @param world global world address
   * @param assetValue string of character asset
   * @param identity identity object of character identity
   * @param playerEntity entity id of current player address
   * @return characterEntity entity id of character
   */
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
