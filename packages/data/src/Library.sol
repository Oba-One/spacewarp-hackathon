// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

  enum Rank {
    Bronze,
    Silver,
    Gold,
    Platinum,
    Diamond
  }

  struct Member {
    address memberAddress;
    uint256 wins;
  }
  struct Asset {
    string uri;
    uint256 assetId;
    Rank rank;
  }