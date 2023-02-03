// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./MudCoin.sol";
import "./Squad.sol";

enum ResultEnum {
  WIN,
  LOSS,
  DRAW
}

contract League {

  // NOTE: Add Tournaments for games in future

  struct Match {
    address gameId; 
    uint startedAt;
    uint finishedAt;
    bool trophyMinted;
    mapping(address => bool) squads;
    mapping(address => bool) players;
    mapping(address => ResultEnum) results;
  }

  struct MatchResult {
    address player;
    ResultEnum result;
  }

  string public name;
  string public description;

  uint16 public gameCount;
  uint16 public squadCount;
  uint16 public squadsAllowed;

  mapping(address => bool) public admins;
  mapping(address => bool) public games;
  mapping(address => bool) public squads;
  
  Match[] public matches;
  
  modifier adminOnly() {
    require(admins[msg.sender], "Admin Only");
    _;
  }

  modifier squadOnly() {
    require(squads[msg.sender], "Squad Only");
    _;
  }

  modifier playerOnly(uint matchId) {
    require(matches[matchId].players[msg.sender], "Player Only");
    _;
  }

  constructor(string memory _name, string memory _description, uint16 _squadsAllowed) {
    name = _name;
    description = _description;
    squadsAllowed = _squadsAllowed;
  }

  function join() external {
    // Check that squad exists using factory
    // Check that squad meets criteria to join
    // Check that squad is not already in league
    // Check that league is not full
    // Add squad to league
    
    // require(token.balanceOf(msg.sender) > 0, "Insufficient DAO Tokens");
    // require(stage == 0, "Please join in the next hop");
    // squads[msg.sender] = true;
  }

  function addAdmin(address adminAddress) external adminOnly {
    admins[adminAddress] = true;
  }

  function addGame(address gameAddress) public adminOnly {
    games[gameAddress] = true;
  }

  function removeGame(address gameAddress) public adminOnly {
    games[gameAddress] = false;
  }

  // Ideally the game world will call this function to create a match
  function createMatch(address _gameId) public {
    require(games[_gameId], "Game Not Found");

    Match storage contest = matches.push();

    contest.gameId = _gameId;
    contest.startedAt = block.timestamp;
    contest.finishedAt = 0;
    contest.trophyMinted = false;
  }

  function updateMatchResult(MatchResult[] calldata _results) external {

  }


}

