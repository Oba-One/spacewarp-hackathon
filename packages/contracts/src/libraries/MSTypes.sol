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

enum CardPositionEnum {
  Hand,
  Location1,
  Location2,
  Location3
}

enum PhaseEnum {
  Commit,
  Reveal,
  Action
}

struct Identity {
  string name;
  string description;
}

struct Effect {
  // @junaama NOTE: Could/Should we use IdentityType here?
  string name;
  string description;
  uint256 value;
  Action action;
}

struct Power {
  uint32 value;
}

struct MoveCard {
  uint32 position;
  bool isMoved;
}

struct Action {
  uint256 useEntity;
  ActionEnum[2] actionTypes;
}

struct GameConfig {
  uint256 startedAt; //
  uint256 finishedAt;
  uint8 turnsLeft;
  // number of seconds from Deck --> Location
  uint32 moveCardLength;
}
