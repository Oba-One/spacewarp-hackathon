// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/components/Uint256Component.sol";
import {PhaseEnum} from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("component.Position"));

contract PhaseComponent is Uint256Component {
    constructor(address world) Uint256Component(world, ID) {}

    function set(uint256 entity, PhaseEnum value) public {
        set(entity, abi.encode(value));
    }

    function getValueTyped(uint256 entity) public view returns (PhaseEnum) {
        return abi.decode(getRawValue(entity), (PhaseEnum));
    }
}
