// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Squad {
  enum ItemType {
    ASSET,
    COLLECTIBLE
  }

  struct Item {
    string url;
    string dealId;
    string pieceId;
    address spAddress;
    uint totalVotes;
    uint yesVotes;
    uint noVotes;
    bool valid;
  }

  uint8 public stage;
  mapping(address => bool) public members;
  mapping(string => Item) public submissions;
  mapping(address => uint256) public winsOfMember;

  modifier ownerOnly() {
    require(msg.sender == owner, "Non Admin Call");
    _;
  }

  modifier memberOnly() {
    require(members[msg.sender], "Member Gated");
    _;
  }

  modifier requireThreeWins() {
    require(winsOfMember[msg.sender] >= 3, "Insufficient wins");
    _;
  }

  modifier requireTenWins() {
    require(winsOfMember[msg.sender] >= 10, "Insufficient wins");
    _;
  }

  address public owner;

  constructor() {
    owner = msg.sender;
    stage = 0;
  }

  receive() external payable {}

  function redeemCollectible() public {}

  function joinSquad() external {
    members[msg.sender] = true;
  }

  function getAssets() public {}

  function getMembers() public {}

  function getProposals() public {}

  function voteOnProposal() public {}

  function propose() public {}

  function validateGame() public {}

  function isMember(address _address) public view returns (bool) {
    return members[_address];
  }
}
