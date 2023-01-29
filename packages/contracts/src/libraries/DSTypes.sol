// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "std-contracts/components/CoordComponent.sol";

uint256 constant GodID = uint256(0x060D);

struct Power {
    uint32 value;
}

struct MoveCard {
    uint32 position;
    uint32 turn;
    bool isMoved;
}

struct Action {
    uint256 useEntity;
    ActionType[2] actionTypes;
}

enum ActionType {
    None,
    Move
}

enum CardPosition {
    Hand,
    Location1,
    Location2,
    Location3
}

enum Phase {
    Commit,
    Reveal,
    Action
}

struct GameConfig {
    // Block timestamp when the game started
    uint256 startTime;
    // Number of seconds
    uint32 commitPhaseLength;
    uint32 revealPhaseLength;
    uint32 actionPhaseLength;
    uint32 worldRadius;
}
