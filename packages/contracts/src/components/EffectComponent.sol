// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/components/Uint32Component.sol";

uint256 constant ID = uint256(keccak256("component.Effect"));

///@notice You can deploy this contract as ID for a system
contract EffectComponent is Uint32Component {
    constructor(address world) Uint32Component(world, ID) {}
}
