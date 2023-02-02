// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

//External
import { getAddressById } from "solecs/utils.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";

//Components
import { PositionComponent, ID as PositionComponentID } from "../components/PositionComponent.sol";
import { Uint32Component } from "std-contracts/components/Uint32Component.sol";

// Types
import { MoveCard } from "./MSTypes.sol";

/**
 * @notice
 * @param
 */

// Base on a number of card set, generate a drawing for each player
library LibDeckDraw {
  uint256[] cardSet;

  function drawDeck(cardSet memory _cardSet) public view returns (int32) {}
}
