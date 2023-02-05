// SPDX-license-identifier: MIT
pragma solidity ^0.8.0;
import "./Squad.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract League is AccessControl {
  event SquadCreated(address newAddress, uint256 squadId);
  event SquadJoined(address member, uint256 squadId);
  event CollectibleRedeemed(address member, uint256 collectibleTokenId);
  event LeagueJoined(address member);

  uint256 maxSquadsAllowed;

  bytes32 public constant LEAGUE_MEMBER = keccak256("LEAGUE_MEMBER");
  bytes public matchMerkleRoot;
  bytes public playerMerkleRoot;
  bytes public winnerMerkleRoot;

  string name;
  string description;
  // @junaama TODO: remove mapping of id -> address
  mapping(uint256 => address) public squadAddresses;
  address[] public leagueMembers;
  mapping(address => bool) public memberExists;

  Squad[] public squads;
  Match[] public matches;

  struct Match {
    uint256 id;
    uint256 gameId;
    uint256 startedAt;
    uint256 finishedAt;
    string winner;
    string[] players;
    Squad[] squads;
    bool collectibleRedeemed;
    uint256 collectibleExpiresAt;
  }

  constructor(string memory _name, string memory _description, uint256 _maxSquadsAllowed){
    maxSquadsAllowed = _maxSquadsAllowed;
    name = _name;
    description = _description;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    
  }

  modifier maxSquads(){
    require(squads.length <= maxSquadsAllowed, "Max squads reached");
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

  function createSquad(string memory _baseURI, string memory _squadName, string memory _squadDescription, string memory _contractURI) public maxSquads returns (uint256){
    Squad newSquad = new Squad(squads.length + 1, _squadName, _squadDescription, _baseURI, _contractURI); 
    uint256 index = squads.length + 1;
    squads.push(newSquad);
    squadAddresses[index] = address(newSquad);
    emit SquadCreated(address(newSquad), index);
    return index;
  }

  function joinLeague() public {
    require(memberExists[msg.sender] == false, "Already in league");
    leagueMembers.push(msg.sender);
    memberExists[msg.sender] = true;
    _grantRole(LEAGUE_MEMBER, msg.sender);
  }

  function joinSquad(uint _index) notInOtherSquad public {
    require(_index <= squads.length, "Squad does not exist");
    Squad squad = Squad(squads[_index]);
    squad.join();
    _grantRole(LEAGUE_MEMBER, msg.sender);
    emit SquadJoined(msg.sender, _index);
  }

  function isSquadMember(address member) public view returns (bool) {
    for (uint i = 0; i < squads.length; i++) {
      Squad squad = squads[i];
      if (squad.isMember(member)) {
        return true;
      }
    }
    return false;
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

  function getSquads() public view returns (Squad[] memory) {
    return squads;
  }
}