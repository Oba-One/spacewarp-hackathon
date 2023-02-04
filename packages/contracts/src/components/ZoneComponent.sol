// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/components/Uint256Component.sol";
import {ZoneEnum} from "libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("component.Zone"));

contract ZoneComponent is Uint256Component {
    constructor(address world) Uint256Component(world, ID) {}

    function set(uint256 entity, ZoneEnum value) public {
        set(entity, abi.encode(value));
    }

    function getValueTyped(uint256 entity) public view returns (ZoneEnum) {
        return abi.decode(getRawValue(entity), (ZoneEnum));
    }
}
