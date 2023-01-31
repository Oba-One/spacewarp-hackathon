// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "solecs/Component.sol";

uint256 constant GodID = uint256();
uint256 constant ID = uint256(keccak256("ms.component.GameConfig"));

import {GameConfig} from "../libraries/DSTypes.sol";

///@notice You can deploy this contract as ID for a system
contract GameConfigComponent is Component {
    constructor(address world) Component(world, ID) {}

    function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
        keys = new string[](2);
        values = new LibTypes.SchemaValue[](2);

        keys[0] = "gameBegin";
        values[0] = LibTypes.SchemaValue.UINT256;

        keys[1] = "moveCardLength";
        values[1] = LibTypes.SchemaValue.UINT32;
    }

    function set(uint256 entity, GameConfig calldata config) public {
        set(entity, encodedValue(config));
    }

    function getValue(uint256 entity) public view returns (GameConfig memory) {
        (uint256 gameBegin, uint32 moveCardLength) = abi.decode(getRawValue(entity), (uint256, uint32));
        return GameConfig(gameBegin, moveCardLength);
    }

    function getEntitiesWithValue(GameConfig calldata config) public view returns (uint256[] memory) {
        return getEntitiesWithValue(encodedValue(config));
    }

    function encodedValue(GameConfig calldata config) private pure returns (bytes memory) {
        return abi.encode(config.gameBegin, config.moveCardLength);
    }
}
