// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import "solecs/System.sol";
import {IWorld} from "solecs/interfaces/IWorld.sol";
import {getAddressById, addressToEntity} from "solecs/utils.sol";

// Components
import {CommitmentComponent, ID as CommitmentComponentID} from "../components/CommitmentComponent.sol";

// Libraries
import "../libraries/LibRound.sol";
import "../libraries/LibUtils.sol";

uint256 constant ID = uint256(keccak256("system.Commit"));

contract CommitSystem is System {
    constructor(IWorld _world, address _components) System(_world, _components) {}

    function execute(bytes memory arguments) public returns (bytes memory) {
        uint256 playerEntity = addressToEntity(msg.sender);
        require(LibRound.getCurrentPhase(components) == PhaseEnum.Commit, "CommitSystem: Not the right Roun");

        uint256 commited = abi.decode(arguments, (uint256));
        CommitmentComponent(getAddressById(components, CommitmentComponentID)).set(playerEntity, commited);
    }

    function executeTyped(uint256 commited) public returns (bytes memory) {
        return execute(abi.encode(commited));
    }
}
