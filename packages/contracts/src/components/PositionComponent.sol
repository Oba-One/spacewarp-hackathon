// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/components/Uint256Component.sol";
import { PositionType } from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("component.Position"));

contract PositionComponent is Uint256Component {
  constructor(address world) Uint256Component(world, ID) {}

  function set(uint256 entity, PositionType value) public {
    set(entity, abi.encode(value));
  }

  function getValueTyped(uint256 entity) public view returns (PositionType) {
    return abi.decode(getRawValue(entity), (PositionType));
  }
}
