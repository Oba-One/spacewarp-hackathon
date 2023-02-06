// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "solecs/Component.sol";

import {MoveCard} from "../libraries/MSTypes.sol";

uint256 constant ID = uint256(keccak256("component.MoveCard"));

contract MoveCardComponent is Component {
    constructor(address world) Component(world, ID) {}

    function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
        keys = new string[](2);
        values = new LibTypes.SchemaValue[](2);

        keys[0] = "location";
        values[0] = LibTypes.SchemaValue.UINT32;

        keys[1] = "used";
        values[1] = LibTypes.SchemaValue.UINT32;
    }

    function set(uint256 entity, MoveCard calldata moveCard) public {
        set(entity, encodedValue(moveCard));
    }

    function getValue(uint256 entity) public view returns (MoveCard memory) {
        (uint8 location, bool used) = abi.decode(getRawValue(entity), (uint8, bool));
        return MoveCard(location, used);
    }

    function getEntitiesWithValue(MoveCard calldata moveCard) public view returns (uint256[] memory) {
        return getEntitiesWithValue(encodedValue(moveCard));
    }

    function encodedValue(MoveCard calldata moveCard) private pure returns (bytes memory) {
        return abi.encode(moveCard.location, moveCard.used);
    }
}
