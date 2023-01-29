// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "std-contracts/components/StringComponent.sol";

uint256 constant ID = uint256(keccak256("ds.component.Name"));

///@title IdentityComponent for item Character
///@author Mehdi R.
///@notice You can deploy this contract as ID for a system
contract IdentityComponent is StringComponent {
    constructor(address world) StringComponent(world, ID) {}
}
