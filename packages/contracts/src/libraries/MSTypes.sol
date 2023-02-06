// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/components/CoordComponent.sol";

uint256 constant snapID = uint256(0x060D);

enum ElementEnum {
  Water,
  Earth,
  Fire,
  Air
}

enum PositionEnum {
  Deck,
  Hand,
  Location1,
  Location2,
  Location3
}

// E stands for "Empty" and in no Zone
enum ZoneEnum {
  A,
  B,
  C,
  D,
  E
}

enum ActionEnum {
  None,
  Move
}

enum PhaseEnum {
  Action,
  Commit
}

struct IdentityType {
  string name;
  string description;
}

struct EffectType {
  string name;
  string description;
  uint256 value;
  ActionType action;
}

struct PowerType {
  uint32 value;
}

struct ActionType {
  uint256 useEntity;
  ActionEnum[2] actionTypes;
}

struct MatchType {
  uint256 startedAt; // timestamps
  uint256 finishedAt; // timestamps
  uint8 turnsLeft; // decrement the number of turns each time
}
