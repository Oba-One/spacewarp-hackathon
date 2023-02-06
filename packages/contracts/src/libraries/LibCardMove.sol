// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Library
import {IdentityType, PositionEnum, MatchType, snapID} from "libraries/MSTypes.sol";
// import { MoveCard, Move, PositionEnum } from "./MSTypes.sol";

//External
import {getAddressById} from "solecs/utils.sol";
import {IUint256Component} from "solecs/interfaces/IUint256Component.sol";

//Components
import {MoveCardComponent, ID as MoveCardID} from "../components/MoveCardComponent.sol";
import {OwnedByComponent, ID as OwnedByID} from "../components/OwnedByComponent.sol";
import {IdentityComponent, ID as IdentityID} from "../components/IdentityComponent.sol";
import {AssetComponent, ID as AssetID} from "../components/AssetComponent.sol";
import {PositionComponent, ID as PositionID} from "../components/PositionComponent.sol";

import {Uint32Component} from "std-contracts/components/Uint32Component.sol";

/**
 * @notice
 * @param
 */

library LibCardMove {
// function moveCard(IUint256Component components, Move memory move, uint256 playerEntity) public {
//     PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionID));
//     MoveCardComponent moveCardComponent = MoveCardComponent(getAddressById(components, MoveCardID));

//     require(
//         OwnedByComponent(getAddressById(components, OwnedByID)).getValue(move.cardEntity) == playerEntity,
//         "MoveSystem: you don't own this card"
//     );

//     require(moveCardComponent.has(move.moveCardEntity), "MoveSystem: invalid move card entity id");
//     require(
//         AssetComponent(getAddressById(components, AssetID)).has(move.cardEntity),
//         "MoveSystem: invalid card Entity id"
//     );

//     MoveCard memory moveCard = moveCardComponent.getValue(move.moveCardEntity);
//     PositionEnum position = positionComponent.getValueTyped(playerEntity);
//     positionComponent.set(move.cardEntity, position);
// }
}
