// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "solecs/Component.sol";

import {MatchType} from "../libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("component.MatchType"));

///@notice You can deploy this contract as ID for a system
contract MatchComponent is Component {
    constructor(address world) Component(world, ID) {}

    function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
        keys = new string[](3);
        values = new LibTypes.SchemaValue[](3);

        keys[0] = "startedAt";
        values[0] = LibTypes.SchemaValue.UINT256;

        keys[1] = "finishedAt";
        values[1] = LibTypes.SchemaValue.UINT256;

        keys[2] = "turnsLeft";
        values[2] = LibTypes.SchemaValue.UINT32;
    }

    function set(uint256 entity, MatchType calldata config) public {
        set(entity, encodedValue(config));
    }

    function getValue(uint256 entity) public view returns (MatchType memory) {
        (uint256 startedAt, uint256 finishedAt, uint8 turnsLeft) =
            abi.decode(getRawValue(entity), (uint256, uint256, uint8));
        return MatchType(startedAt, finishedAt, turnsLeft);
    }

    function getEntitiesWithValue(MatchType calldata config) public view returns (uint256[] memory) {
        return getEntitiesWithValue(encodedValue(config));
    }

    function encodedValue(MatchType calldata config) private pure returns (bytes memory) {
        return abi.encode(config.startedAt, config.finishedAt, config.turnsLeft);
    }
}
