// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

// Components
import { OwnedByComponent, ID as OwnedByID } from "../components/OwnedByComponent.sol";
import { IdentityComponent, ID as IdentityID } from "../components/IdentityComponent.sol";
import { AssetComponent, ID as AssetID } from "../components/AssetComponent.sol";
import { PositionComponent, ID as PositionID } from "../components/PositionComponent.sol";
import { MatchComponent, ID as MatchID } from "../components/MatchComponent.sol";
import { PrevActionComponent, ID as PrevActionID } from "../components/PrevActionComponent.sol";

// Types
import { ActionEnum, PhaseEnum } from "../libraries/MSTypes.sol";

// Libraries
import "../libraries/LibAction.sol";
import "../libraries/LibRound.sol";
import "../libraries/LibUtils.sol";

uint256 constant ID = uint256(keccak256("system.Action"));

contract ActionSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    ActionType[] memory actions = abi.decode(arguments, (ActionType[]));

    uint256 playerEntity = addressToEntity(msg.sender);

    PrevActionComponent prevActionComponent = PrevActionComponent(getAddressById(components, PrevActionID));
    require(LibRound.getCurrentPhase(components) == PhaseEnum.Action, "ActionSystem: incorrect phase");

    uint32 currentRound = LibRound.getCurrentRound(components);
    require(
      prevActionComponent.getValue(addressToEntity(msg.sender)) < currentRound,
      "ActionSystem: already acted this round"
    );

    // actions = prevActionComponent.set(playerEntity, currentRound);
    LibAction.executeActions(components, ActionEnum.Move);
  }

  function executeTyped(ActionType[] calldata actions) public returns (bytes memory) {
    return execute(abi.encode(actions));
  }
}
