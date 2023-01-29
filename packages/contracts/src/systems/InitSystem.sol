// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { LibInit } from "libraries/LibInit.sol";

uint256 constant ID = uint256(keccak256("system.Increment"));

contract InitSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory) public returns (bytes memory) {
    uint256 playerEntity = LibInit.initPlayer(msg.sender);
    LibInit.init(world, components, playerEntity);
  }

  function executeTyped(uint256 entity) public returns (bytes memory) {
    return execute(abi.encode(entity));
  }
}
