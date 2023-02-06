// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SquadCollectibles.sol";

contract Squad is SquadCollectibles {
  event ProposalCreated(uint256 id, address proposer, uint256 assetId);
  event ProposalVoted(address indexed voter, uint256 proposalId, bool support);
  event ProposalCancelled(uint256 id);
  event ProposalExecuted(uint256 id);

  struct Member {
    address memberAddress;
    uint256 wins;
  }
  struct Asset {
    string uri;
    uint256 assetId;
    rank:
  }
  struct Proposal {
    uint256 id;
    uint256 assetId;
    string assetUri;
    address proposer;
    string description;
    uint256 forVotes;
    uint256 againstVotes;
    bool cancelled;
    bool executed;
  }
  struct Receipt {
    uint256 proposalId;
    bool voted;
    bool support;
  }

  address private _owner;
  address[] public squadMembers;
  mapping(address => bool) public members;
  mapping(address => uint256) public collectiblesEarned;
  uint256 collectiblesId;
  uint256 public squadId;
  string public squadName;
  string public squadDescription;

  Proposal[] public proposals;
  Asset[] public assets;
  mapping(address => Receipt) public receipts;

  constructor(string calldata _squadName, string calldata _squadDescription, string calldata _baseURI, string calldata _contractURI) SquadCollectibles(_baseURI, _contractURI) {
    _owner = msg.sender;
    squadId = _squadId;
    squadName = _squadName;
    squadDescription = _squadDescription;
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
    require(collectiblesEarned[msg.sender] >= 3, "Insufficient wins");
    _;
  }

  modifier requireTenWins() {
    require(collectiblesEarned[msg.sender] >= 10, "Insufficient wins");
    _;
  }

  function redeemCollectible() public {
    mintCollectible(msg.sender, collectiblesId);
    collectiblesEarned[msg.sender] = collectiblesEarned[msg.sender] + 1;
  }

  function join() public ownerOnly {
    receiveOnJoin(msg.sender, squadId);
    squadMembers.push(msg.sender);
    members[msg.sender] = true;
  }

  function addMember(address _address, uint256 wins) public ownerOnly {
    receiveOnJoin(_address, squadId);
    squadMembers.push(_address);
    members[_address] = true;
    collectiblesEarned[_address] = wins;
  }

  function getAssets() public view returns (Asset[] memory) {
    return assets;
  }

  function getMembers() public view returns (address[] memory) {
    return squadMembers;
  }
  function getMembersData() public view returns (Member[] memory) {
    Member[] memory membersData = new Member[](squadMembers.length);
    for (uint256 i = 0; i < squadMembers.length; i++) {
      membersData[i] = Member(squadMembers[i], collectiblesEarned[squadMembers[i]]);
    }
    return membersData;
  }

  function getCollectiblesEarned() public view returns (uint256) {
    return collectiblesEarned[msg.sender];
  }

  function getProposals() public view returns (Proposal[] memory) {
    return proposals;
  }

  function voteOnProposal(uint256 proposalId, bool support) external {
    Proposal storage proposal = proposals[proposalId];
    Receipt storage receipt = receipts[msg.sender];
    if (support) {
      proposal.forVotes = proposal.forVotes + 1;
    } else {
      proposal.againstVotes = proposal.againstVotes + 1;
    }
    receipt.voted = true;
    receipt.support = support;

    emit ProposalVoted(msg.sender, proposalId, support);
  }

  /**
   * @notice Function to propose a new asset to be added to the DAO
   */
  function proposeUpdate(uint256 _assetId, string memory _description, string memory _uri) public returns (uint256) {
    Proposal memory proposal;
    proposal.id = proposals.length + 1;
    proposal.proposer = msg.sender;
    proposal.description = _description;
    proposal.assetId = _assetId;
    proposal.assetUri = _uri;
    proposals.push(proposal);
    emit ProposalCreated(proposal.id, msg.sender, proposal.assetId);
    return proposal.id;
  }

  function isMember(address _address) public view returns (bool) {
    return members[_address];
  }
  function updateAssets(Asset calldata _assets) public ownerOnly {
    assets.push(_assets);
  }

  function getSquadInfo() public view returns (bytes32) {
    return keccak256(abi.encodePacked(squadId, squadName, squadDescription));
  }
}
