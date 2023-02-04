// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import "solecs/System.sol";
import {IWorld} from "solecs/interfaces/IWorld.sol";
import {getAddressById, getSystemAddressById, addressToEntity} from "solecs/utils.sol";

//Components
import {AssetComponent, ID as AssetComponentID} from "../components/AssetComponent.sol";
import {EffectComponent, ID as EffectComponentID} from "../components/EffectComponent.sol";
import {EnergyComponent, ID as EnergyComponentID} from "../components/EnergyComponent.sol";
import {IdentityComponent, ID as IdentityComponentID} from "../components/IdentityComponent.sol";
import {MatchComponent, ID as MatchComponentID} from "../components/MatchComponent.sol";
import {OwnedByComponent, ID as OwnedByComponentID} from "../components/OwnedByComponent.sol";
import {PhaseComponent, ID as PhaseComponentID} from "../components/PhaseComponent.sol";
import {PositionComponent, ID as PositionComponentID} from "../components/PositionComponent.sol";
import {PowerComponent, ID as PowerComponentID} from "../components/PowerComponent.sol";
import {ZoneComponent, ID as ZoneComponentID} from "../components/ZoneComponent.sol";
import {CommitmentComponent, ID as CommitmentComponentID} from "../components/CommitmentComponent.sol";

import {LibRound} from "../libraries/LibRound.sol";

import {
    ElementEnum,
    PositionEnum,
    ZoneEnum,
    ActionEnum,
    PhaseEnum,
    IdentityType,
    EffectType,
    PowerType,
    ActionType,
    MatchType
} from "../libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("system.Move"));

contract MoveCardSystem is System {
    constructor(IWorld _world, address _components) System(_world, _components) {}

    function execute(bytes memory arguments) public returns (bytes memory) {
        uint256 playerEntity = addressToEntity(msg.sender);

        require(
            uint256(keccak256(arguments))
                == CommitmentComponent(getAddressById(components, CommitmentComponentID)).getValue(playerEntity),
            "Commitment doesn't match the move : push next round "
        );

        require(
            LibRound.getCurrentPhase(components) != PhaseEnum.Action,
            "MoveSystem: cannot complete move during Action Timed"
        );

        uint32 currentRound = LibRound.getCurrentRound(components);
        PhaseComponent phaseComponent = PhaseComponent(getAddressById(components, PhaseComponentID));

        phaseComponent.set(playerEntity, currentRound);
    }
}
