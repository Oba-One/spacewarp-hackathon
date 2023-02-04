// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import {getAddressById} from "solecs/utils.sol";
import {IUint256Component} from "solecs/interfaces/IUint256Component.sol";

// Components
import {OwnedByComponent, ID as OwnedByComponentID} from "../components/OwnedByComponent.sol";

// Types
import {snapID, MatchType, ActionEnum, PhaseEnum, ActionType} from "../libraries/MSTypes.sol";

// Libraries
import "./LibUtils.sol";
import "./LibRound.sol";

library LibAction {
    /**
     * @notice  executes all actions corresponding to the input action
     * @param   components  world components
     * @param   action  set of actions to execute
     */
    function executeActions(IUint256Component components, ActionEnum action) public {
        // 2
        for (uint256 i = 0; i < 2; i++) {
            ActionEnum _action = ActionEnum.Move;
            if (action == ActionEnum.None) continue;
            else if (action == ActionEnum.Move){
                break;
            }
        }
    }
}
