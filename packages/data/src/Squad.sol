// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./SquadCollectibles.sol";

contract Squad is SquadCollectibles {
  event ProposalCreated(uint256 id, address proposer, uint256 assetId);
  event ProposalVoted(address indexed voter, uint256 proposalId, uint256 support);
  event ProposalCancelled(uint256 id);
  event ProposalExecuted(uint256 id);

  address private _owner;
  address[] public squadMembers;
  mapping(address => bool) public members;
  mapping(string => Item) public submissions;
  mapping(address => uint256) public winsOfMember;
  uint256 public squadId;

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
  struct Proposal {
    uint256 id;
    uint256 assetId;
    address proposer;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
    bool cancelled;
    bool executed;
  }

  enum Vote {
    FOR,
    AGAINST,
    ABSTAIN
  }
  struct Receipt {
    bool voted;
    Vote support;
  }

  Proposal[] public proposals;
  Asset[] public assets;
  mapping(address => Receipt) public receipts;

  constructor(uint256 _squadId) {
    _owner = msg.sender;
    squadId = _squadId;
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

  function redeemCollectible() public {
    mintCollectible(msg.sender);
    winsOfMember[msg.sender] = winsOfMember[msg.sender] + 1;
  }

  function joinSquad() internal {
    receiveOnJoin(msg.sender, squadId);
    members[msg.sender] = true;
  }

  function getAssets() public returns (Asset[] memory) {
    return assets;
  }

  function getMembers() public {
    // @junaama TODO create gas efficient way to enumerate members
  }

  function getProposals() public {

  }

  function voteOnProposal(uint256 proposalId, uint256 support) external {
    require(support <= 2, "Invalid vote");
    Proposal storage proposal = proposals[proposalId];
    Receipt storage receipt = proposal.receipts[msg.sender];
    if (support == 0) {
      proposal.forVotes = proposal.forVotes + 1;
    } else if (support == 1) {
      proposal.againstVotes = proposal.againstVotes + 1;
    } else {
      proposal.abstainVotes = proposal.abstainVotes + 1;
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

  function isMember(address _address) public view returns (bool) {
    return members[_address];
  }
}
