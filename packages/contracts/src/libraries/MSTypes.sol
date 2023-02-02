// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

uint256 constant GodID = uint256(0x060D);

enum ElementType {
  Water,
  Earth,
  Fire,
  Air
}

enum PositionType {
  Deck,
  Location1,
  Location2,
  Location3
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

struct Power {
  uint32 value;
}

struct MoveCard {
  uint32 position;
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
  uint256 gameBegin;
  // number of seconds from Deck --> Location
  uint32 moveCardLength;
}
