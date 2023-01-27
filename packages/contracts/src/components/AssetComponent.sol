// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/StringComponent.sol";
import { AssetType } from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("mudSnap.component.Asset"));

contract AssetComponent is StringComponent {
  constructor(address world) StringComponent(world, ID) {}

  function set(uint256 entity, AssetType memory value) public {
    set(entity, abi.encode(value));
  }

  function getValueTyped(uint256 entity) public view returns (AssetType memory) {
    return abi.decode(getRawValue(entity), (AssetType));
  }
}
