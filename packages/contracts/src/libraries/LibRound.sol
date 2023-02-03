// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import {IUint256Component} from "solecs/interfaces/IUint256Component.sol";
import {getAddressById} from "solecs/utils.sol";

// Components
import {MatchComponent, ID as MatchComponentID} from "../components/MatchComponent.sol";

// Types
import {snapID, MatchType, ActionType, PhaseEnum} from "../libraries/MSTypes.sol";

library LibRound {
    function getCurrentRound(IUint256Component components) internal view returns (uint32) {
        return getRoundAt(components, block.timestamp);
    }

    function getCurrentPhase(IUint256Component components) internal view returns (PhaseEnum) {
        return getTimeAt(components, block.timestamp);
    }

    function getTimeAt(IUint256Component components, uint256 atTime) internal view returns (PhaseEnum) {
        MatchType memory matchType = MatchComponent(getAddressById(components, MatchComponentID)).getValue(snapID);
        require(atTime >= matchType.startedAt, "invalid atTime");

        uint256 gameLength = atTime - matchType.startedAt;
        uint256 secondsIntoTurn = 10;

        if (secondsIntoTurn < 10) return PhaseEnum.Commit;
        else return PhaseEnum.Action;
    }

    function getRoundAt(IUint256Component components, uint256 atTime) internal view returns (uint32) {
        MatchType memory matchType = MatchComponent(getAddressById(components, MatchComponentID)).getValue(snapID);
        require(atTime >= matchType.startedAt, "invalid block time");

        uint256 result = atTime - matchType.startedAt;
        return uint32(result);
    }
}
