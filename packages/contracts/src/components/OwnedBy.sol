// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "std-contracts/components/BoolComponent.sol";

uint256 constant ID = uint256(keccak256("ds.component.Loaded"));

///@title OwnedBy for item Character
///@author Mehdi R.
///@notice You can deploy this contract as ID for a system
contract OwnedBy is BoolComponent {
    constructor(address world) BoolComponent(world, ID) {}
}
