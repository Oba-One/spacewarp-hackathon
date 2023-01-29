// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "solecs/Component.sol";

contract PositionComponent is Uint32Component {
    constructor(address world) Uint32Component(world, ID) {}
}
