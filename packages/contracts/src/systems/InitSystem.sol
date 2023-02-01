// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { LibInit } from "libraries/LibInit.sol";
import { IdentityType, PositionType } from "libraries/MSTypes.sol";
import { OwnedByComponent, ID as OwnedByID } from "../components/OwnedByComponent.sol";
import { IdentityComponent, ID as IdentityID } from "../components/IdentityComponent.sol";
import { AssetComponent, ID as AssetID } from "../components/AssetComponent.sol";
import { PositionComponent, ID as PositionID } from "../components/PositionComponent.sol";

uint256 constant ID = uint256(keccak256("system.Init"));

contract InitSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory) public returns (bytes memory) {
    uint256 playerEntity = LibInit.initPlayer(msg.sender);
    IdentityType memory identity1 = IdentityType({ name: "SpiderMan1", description: "Spiderman One" });
    // @junaama TODO: remove hardcoding later
    string
      memory asset = "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

    PositionType position = PositionType.Deck;
    uint256 characterEntity = world.getUniqueEntityId();

    PositionComponent(getAddressById(components, PositionID)).set(characterEntity, position);
    OwnedByComponent(getAddressById(components, OwnedByID)).set(characterEntity, playerEntity);
    AssetComponent(getAddressById(components, AssetID)).set(characterEntity, asset);
    IdentityComponent(getAddressById(components, IdentityID)).set(characterEntity, identity1);
  }

  function executeTyped() public returns (bytes memory) {
    return execute(new bytes(0));
  }
}
