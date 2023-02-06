// SPDX-license-identifier: MIT
pragma solidity ^0.8.0;
import "./SquadFactory.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract League is AccessControl, SquadFactory {
  event SquadJoined(address member, uint256 squadId);
  event LeagueJoined(address member);
  event CollectibleRedeemed(address member, uint256 collectibleTokenId);

  uint256 leagueOpensAt;
  uint256 leageClosesAt;
  uint256 maxSquadsAllowed;

  // TODO: Add tournaments  with matches and more time based features/events

  bytes32 public constant LEAGUE_MEMBER = keccak256("LEAGUE_MEMBER");
  bytes public matchMerkleRoot;
  bytes public playerMerkleRoot;
  bytes public winnerMerkleRoot;

  string name;
  string description;
  address[] public leagueMembers;
  mapping(address => bool) public squadAddresses;
  mapping(address => address) public memberToSquad;

  Squad[] public squads;
  Match[] public matches;

  struct Match {
    uint256 id;
    uint256 gameId; // ECS World Address
    uint256 startedAt; // Timestamp
    uint256 finishedAt; // Timestamp
    uint256 collectibleExpiresAt; 
    bool collectibleRedeemed; 
    address winner; // Address of winner either player or squad
    address[] players;
    address[] squads;
  }

  struct MemberInfo {
    address squadAddress;
  }

  constructor(string memory _name, string memory _description, uint256 _maxSquadsAllowed){
    maxSquadsAllowed = _maxSquadsAllowed;
    name = _name;
    description = _description;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    
  }

  modifier onlyOpenLeague(){
    require(block.timestamp >= leagueOpensAt, "League is not open yet");
    require(block.timestamp <= leageClosesAt, "League is closed");
    _;
  }

  modifier onlyClosedLeague(){
    require(block.timestamp >= leageClosesAt, "League is not closed yet");
    _;
  }

  modifier maxSquads(){
    require(squads.length <= maxSquadsAllowed, "Max squads reached");
    _;
  }

  modifier onlyLeagueMember(){
    require(hasRole(LEAGUE_MEMBER, msg.sender), "Not a league member");
    _;
  }

  modifier notInOtherSquad(){
    for(uint i = 0; i < squads.length; i++){
      Squad squad = squads[i];
      require(squad.isMember(msg.sender) == false, "Already in a squad");
    }
    _;
  }

  modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
    require(
      MerkleProof.verify(
        merkleProof,
        root,
        keccak256(abi.encodePacked(msg.sender))
      ),
      "Required data does not exist in list"
    );
    _;
  }

  function openLeague(uint256 _leagueOpensAt, uint256 _leageClosesAt) public onlyRole(DEFAULT_ADMIN_ROLE) {
    leagueOpensAt = _leagueOpensAt;
    leageClosesAt = _leageClosesAt;
  }

  function closeLeague() public onlyRole(DEFAULT_ADMIN_ROLE) onlyOpenLeague {
    leageClosesAt = block.timestamp;
  }

  function joinSquad(uint _index) notInOtherSquad external {
    require(_index <= squads.length, "Squad does not exist");
    Squad squad = Squad(squads[_index]);
    squad.join();
    memberToSquad[msg.sender] = address(squad);
    _grantRole(LEAGUE_MEMBER, msg.sender);
    emit SquadJoined(msg.sender, _index);
  }

  function isSquadMember(address member) public view returns (MemberInfo memory) {
    for (uint i = 0; i < squads.length; i++) {
      Squad squad = squads[i];
      if (squad.isMember(member)) {
        return  new MemberInfo(address(squad));
      }
    }
    return new MemberInfo(address(0));
  }

  function createMatch(
    uint256 _gameId,
    uint256 _startedAt,
    uint256 _collectibleExpiresIn,
    address[] memory _players,
    address[] memory _squads
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    Match memory newMatch = Match(
      matches.length + 1,
      _gameId,
      _startedAt,
      0,
      block.timestamp + _collectibleExpiresIn + 10 minutes,
      false,
      address(0),
      _players,
      _squads
    );
    matches.push(newMatch);
  }

  function finishMatch(uint256 _matchId, address _winner) public onlyRole(DEFAULT_ADMIN_ROLE) {
    Match game = matches[_matchId];
    game.finishedAt = block.timestamp;
    game.winner = _winner;
  }

  function redeemMatchCollectible(uint256 _matchId) external onlyLeagueMember onlyClosedLeague {
    Match game = matches[_matchId];
    require(game.collectibleRedeemed == false, "Collectible already redeemed");
    require(game.collectibleExpiresAt > block.timestamp, "Collectible expired");
    require(game.winner == msg.sender, "Not winner of match");

    Squad squad = Squad(squadAddresses[msg.sender]);
    squad.redeemCollectible(game.gameId);
    game.collectibleRedeemed = true;

    emit CollectibleRedeemed(msg.sender, _matchId);
  }

  function setMatchMerkleRoot(bytes memory _matchMerkleRoot) external onlyRole(DEFAULT_ADMIN_ROLE) {
    matchMerkleRoot = _matchMerkleRoot;
  }
  function setWinnerMerkleRoot(bytes memory _winnerMerkleRoot) external onlyRole(DEFAULT_ADMIN_ROLE) {
    winnerMerkleRoot = _winnerMerkleRoot;
  }
  function setPlayerMerkleRoot(bytes memory _playerMerkleRoot) external onlyRole(DEFAULT_ADMIN_ROLE) {
    playerMerkleRoot = _playerMerkleRoot;
  }

  function squadMembers(uint256 _squadId) external view returns (address[] memory) {
    Squad squad = Squad(squads[_squadId]);
    return squad.getMembers();
  }

  function getSquads() external view returns (Squad[] memory) {
    return squads;
  }

   function getMatches() external view returns (Match[] memory) {
    return matches;
  }
}