// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

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

// @junaama TODO: Action names are placeholders for now
enum ActionType {
    Action1,
    Action2,
    Action3,
    Action4
}
// @junaama @TODO I don't think we need this for now
// struct AssetType {
//     string image;
//     string model;
// }

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