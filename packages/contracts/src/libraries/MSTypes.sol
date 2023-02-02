// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

uint256 constant GodID = uint256(0x060D);

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
  Commit,
  Reveal
}

struct IdentityType {
  string name;
  string description;
}

struct EffectType {
  // @junaama NOTE: Could/Should we use IdentityType here?
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
  uint256 startedAt; //
  uint256 finishedAt;
  uint8 turnsLeft;
  // number of seconds from Deck --> Location
  uint32 moveCardLength;
}
