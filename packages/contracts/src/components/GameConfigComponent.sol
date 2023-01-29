// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "solecs/Component.sol";

uint256 constant GodID = uint256();
uint256 constant ID = uint256(keccak256("ds.component.GameConfig"));

import {GameConfig} from "../libraries/DSTypes.sol";

///@title GameConfigComponent for item Character
///@author Mehdi R.
///@notice You can deploy this contract as ID for a system
contract GameConfigComponent is Component {
    constructor(address world) Component(world, ID) {}

    function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
        keys = new string[](); // add nmber of Schemas you add
        values = new LibTypes.SchemaValue[](); // add nmber of Schemas you add

        keys[0] = ""; // TODO : Name of schemas
        values[0] = LibTypes.SchemaValue.UINT256;

        keys[1] = "";
        values[1] = LibTypes.SchemaValue.UINT32;

        keys[2] = "";
        values[2] = LibTypes.SchemaValue.UINT32;

        keys[3] = "";
        values[3] = LibTypes.SchemaValue.UINT32;

        keys[4] = "";
        values[4] = LibTypes.SchemaValue.UINT32;
    }

    function set(uint256 entity, GameConfig calldata config) public {
        set(entity, encodedValue(config));
    }

    function getValue(uint256 entity) public view returns (GameConfig memory) {
        (
            uint256 startTime, // TODO : change names of tuple params
            uint32 commitPhaseLength,
            uint32 revealPhaseLength,
            uint32 actionPhaseLength,
            uint32 worldRadius
        ) = abi.decode(getRawValue(entity), (uint256, uint32, uint32, uint32, uint32));
        return GameConfig(startTime, commitPhaseLength, revealPhaseLength, actionPhaseLength, worldRadius);
    }

    function getEntitiesWithValue(GameConfig calldata config) public view returns (uint256[] memory) {
        return getEntitiesWithValue(encodedValue(config));
    }

    function encodedValue(GameConfig calldata config) private pure returns (bytes memory) {
        return abi.encode( // TODO : change names of tuple params
            config.startTime,
            config.commitPhaseLength,
            config.revealPhaseLength,
            config.actionPhaseLength,
            config.worldRadius
        );
    }
}