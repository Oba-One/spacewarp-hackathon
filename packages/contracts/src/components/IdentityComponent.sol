// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/StringComponent.sol";

uint256 constant ID = uint256(keccak256("mudSnap.component.Identity"));

contract IdentityComponent is StringComponent {
  constructor(address world) StringComponent(world, ID) {}
}