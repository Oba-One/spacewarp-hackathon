// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

//External
import {getAddressById} from "solecs/utils.sol";
import {IUint256Component} from "solecs/interfaces/IUint256Component.sol";

//Components
import {PositionComponent, ID as PositionComponentID} from "../components/Position.sol";
import {Uint32Component} from "std-contracts/components/Uint32Component.sol";

// Types
import {MoveCard, SidePosition} from "./DSTypes.sol";

/**
 * @notice
 * @param
 * @return
 */

uint256[] cardSet;

// Base on a number of card set, generate a drawing for each player
library DeckDraw {
    function drawDeck(cardSet memory _cardSet) public view returns (int32) {}
}
