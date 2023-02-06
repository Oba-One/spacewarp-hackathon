// SPDX-license-identifier: MIT
pragma solidity ^0.8.0;
import "./SquadFactory.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract League is AccessControl, SquadFactory {
  event SquadJoined(address member);
  event LeagueJoined(address member);
  event CollectibleRedeemed(address member, uint256 collectibleTokenId);

  uint256 leagueOpensAt;
  uint256 leageClosesAt;
  uint256 maxSquadsAllowed;

  // TODO: Add tournaments  with matches and more time based features/events
  // TODO: Adda trade funnctionality
  // TODO: Add to convert contracts to fit ECS model and be extensible

  bytes32 public constant LEAGUE_MEMBER = keccak256("LEAGUE_MEMBER");
  bytes public matchMerkleRoot;
  bytes public playerMerkleRoot;
  bytes public winnerMerkleRoot;

  string name;
  string description;
  mapping(address => bool ) public gameExists;
  mapping(address => bool) public squadExists;
  mapping(address => address) public memberToSquad;

  Game[] public games;
  // Squad[] public squads; // Not needed for now while League is also squad factory
  Match[] public matches;
  address[] public members;

  struct Game {
    address worldAddress;
    uint256 chainId;
  }

  struct Match {
    uint256 id;
    uint256 startedAt; // Timestamp
    uint256 finishedAt; // Timestamp
    uint256 collectibleExpiresAt; 
    bool collectibleRedeemed; 
    address gameId; // ECS World Address
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
    // require(block.timestamp >= leagueOpensAt, "League is not open yet");
    // require(block.timestamp <= leageClosesAt, "League is closed");
    _;
  }

  modifier onlyClosedLeague(){
    require(block.timestamp >= leageClosesAt, "League is not closed yet");
    _;
  }

  modifier isGameRegistered(address _worldAddress){
    require(gameExists[_worldAddress] == true, "Game is not registered");
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

  function enterLeague(address _squadAddress) public onlyOpenLeague maxSquads {
    require(squadExists[_squadAddress] == false, "Squad already exists");
    Squad squad = Squad(_squadAddress);
    squads.push(squad);
    squadExists[_squadAddress] = true;

    emit SquadJoined(msg.sender);
  }

  function closeLeague() public onlyRole(DEFAULT_ADMIN_ROLE) onlyOpenLeague {
    leageClosesAt = block.timestamp;
  }

  function addGame(address _worldAddress, uint256 _chainId) public onlyRole(DEFAULT_ADMIN_ROLE) {
    require(gameExists[_worldAddress] == false, "Game already exists");
    games.push(Game(_worldAddress, _chainId));
    gameExists[_worldAddress] = true;
  }

  function removeGame(address _worldAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
    require(gameExists[_worldAddress] == true, "Game does not exist");
    for(uint i = 0; i < games.length; i++){
      if(games[i].worldAddress == _worldAddress){
        games[i] = games[games.length - 1];
        games.pop();
        break;
      }
    }
    gameExists[_worldAddress] = false;
  }

  function joinSquad(address _squadAddress) notInOtherSquad external {
    require(squadExists[_squadAddress] == true, "Squad does not exist");
    Squad squad = Squad(_squadAddress);
    squad.join();
    memberToSquad[msg.sender] = address(squad);
    _grantRole(LEAGUE_MEMBER, msg.sender);
  
    emit SquadJoined(msg.sender);
  }

  function addMemberToSquad(address _squadAddress, address _member, uint256 _wins) public onlyRole(DEFAULT_ADMIN_ROLE) {
    require(squadExists[_squadAddress] == true, "Squad does not exist");
    Squad squad = Squad(_squadAddress);
    squad.addMember(_member, _wins);
    memberToSquad[_member] = address(squad);
    _grantRole(LEAGUE_MEMBER, _member);
    emit SquadJoined(_member);
  }

  function isSquadMember(address member) public view returns (MemberInfo memory) {
    for (uint i = 0; i < squads.length; i++) {
      Squad squad = squads[i];
      if (squad.isMember(member)) {
        return MemberInfo(address(squad));
      }
    }
    return MemberInfo(address(0));
  }

  function createMatch(
    uint256 _collectibleExpiresIn,
    address _gameId,
    address[] memory _players,
    address[] memory _squads
  ) public onlyRole(DEFAULT_ADMIN_ROLE) onlyOpenLeague isGameRegistered(_gameId) {
    require(_players.length > 0 || _squads.length > 0, "No players or squads");
    require(_collectibleExpiresIn > 0, "Collectible expires in must be greater than 0");    

    Match memory newMatch = Match(
      matches.length + 1,
      block.timestamp,
      0,
      block.timestamp + _collectibleExpiresIn + 10 minutes,
      false,
      _gameId,
      address(0),
      _players,
      _squads
    );
    matches.push(newMatch);
  }

  function finishMatch(uint256 _matchId, address _winner) public onlyRole(DEFAULT_ADMIN_ROLE) {
    Match storage game = matches[_matchId];
    game.finishedAt = block.timestamp;
    game.winner = _winner;
  }

  function redeemMatchCollectible(uint256 _matchId) external onlyLeagueMember onlyClosedLeague {
    Match storage game = matches[_matchId];
    require(game.collectibleRedeemed == false, "Collectible already redeemed");
    require(game.collectibleExpiresAt > block.timestamp, "Collectible expired");
    require(game.winner == msg.sender, "Not winner of match");

    Squad squad = Squad(memberToSquad[msg.sender]);
    squad.redeemCollectible();
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

  function squadMembers(uint256 _squadId) public view returns (address[] memory) {
    Squad squad = Squad(squads[_squadId]);
    return squad.getMembers();
  }

  function getMatch(uint256 _matchId) public view returns (Match memory) {
    return matches[_matchId];
  }


}