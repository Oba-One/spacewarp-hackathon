// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Squad {
  address private _owner;
  address[] public squadMembers;
  mapping(address => bool) public members;
  mapping(string => Item) public submissions;
  mapping(address => uint256) public winsOfMember;

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
  struct Asset {
    string uri;
    uint256 assetId;
  }
  Asset[] public assets;

  constructor() {
    _owner = msg.sender;
  }

  modifier ownerOnly() {
    require(msg.sender == _owner, "Non Admin Call");
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

  modifier notInOtherSquad() {
    // @junaama TODO: implement this
    _;
  }

  receive() external payable {}

  function redeemCollectible() public {

  }

  function joinSquad() internal {
    members[msg.sender] = true;
  }

  function getAssets() public {
    return assets;
  }

  function getMembers() public {
    // create array of all members in squad

  }

  function getProposals() public {

  }

  function voteOnProposal(uint256 proposalId, uint256 support) external {
    require(support <= 2, "Invalid vote");
    Proposal storage proposal = proposals[proposalId];
    Receipt storage receipt = proposal.receipts[msg.sender];
    if (support == 0) {
      proposal.forVote = proposal.forVote + 1;
    } else if (support == 1) {
      proposal.againstVote = proposal.againstVote + 1;
    } else {
      proposal.abstainVote = proposal.abstainVote + 1;
    }
    receipt.voted = true;
    receipt.support = support;

    emit ProposalVoted(msg.sender, proposalId, support);
  }

  /**
   * @notice Function to propose a new asset to be added to the DAO
   */
  function propose(string memory description) public returns (uint256) {
    Proposal memory proposal;
    emit ProposalCreated();

    return proposal.id;
  }

  function validateGame() public {}

  function isMember(address _address) public view returns (bool) {
    return members[_address];
  }
}
