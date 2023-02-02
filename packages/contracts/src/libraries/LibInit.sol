// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { addressToEntity } from "solecs/utils.sol";

library LibInit {
  /**
   * @notice initializes player entity with default values
   * @param playerAddress address of player
   * @return playerEntity entity id of player
   */
  function initPlayer(address playerAddress) internal pure returns (uint256 playerEntity) {
    playerEntity = addressToEntity(playerAddress);
    // @junaama TODO: add components and add to PlayerComponent
  }
}
