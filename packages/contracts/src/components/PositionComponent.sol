// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "solecs/Component.sol";

///@title PositionComponent for item Character
///@author Mehdi R.
///@notice You can deploy this contract as ID for a system
contract PositionComponent is Uint32Component {
    constructor(address world) Uint32Component(world, ID) {}
}
