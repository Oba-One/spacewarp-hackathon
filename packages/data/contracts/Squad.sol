// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./MudCoin.sol";

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

  IERC20 public token;
  uint8 public stage; 
  mapping(address => bool) public members;
  mapping(string => Item) public submissions;
  
  modifier ownerOnly() {
    require(msg.sender == owner, "Non Admin Call");
    _;
  }

  modifier memberOnly() {
    require(members[msg.sender], "Member Gated");
    _;
  }

  address public owner;

  constructor() {
    owner = msg.sender;
    stage = 0;
  }

  // Set the native token of the DAO
  function setToken(address tokenAddress) public ownerOnly {
    token = IERC20(address(tokenAddress));
  }

  // Use a cron or an oracle to advance the stages
  function advance() public ownerOnly {
    stage = stage % 5;
  }

  // Join this instance of the DataDAO, if the token criteria is met
  function join() public {
    require(token.balanceOf(msg.sender) > 0, "Insufficient DAO Tokens");
    require(stage == 0, "Please join in the next hop");
    members[msg.sender] = true;
  }

  // TODO: Make this quadratic voting
  function voteForItem(string memory url, uint voteCount) public memberOnly {
    require(stage == 1,"Incorrect stage"); 
    // Ensure that the voter has enough tokens to vote
    require(token.balanceOf(msg.sender) >= voteCount, "Insufficient balance");
    if(submissions[url].valid) {
      submissions[url].totalVotes += voteCount;
      // This works since, the contract address is always whitelisted in the ERC 20 implementation
      token.transferFrom(msg.sender, address(this), voteCount);
    }
    else {
      Item memory newItem = Item({
        url: url,
        dealId: "",
        pieceId: "",
        spAddress: address(0),
        totalVotes: 0,
        yesVotes: voteCount,
        noVotes: 0,
        valid: true
      });
      submissions[url] = newItem;
    }
  }

  // Miners can submit their interest and submit proofs of storage as well
  function submitMinerProof(string memory url, string memory dealId, string memory pieceCid) public {
    require(stage == 2,"Incorrect stage"); 
    Item memory targetItem = submissions[url];
    if(targetItem.valid)  {
      targetItem.dealId = dealId;
      targetItem.pieceId = pieceCid;
      targetItem.spAddress = msg.sender;
      targetItem.noVotes = targetItem.totalVotes - targetItem.yesVotes;
    }
    submissions[url] = targetItem;
  }

  function voteStorageProvider() public {

  }
}
