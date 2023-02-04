// SPDX-license-identifier: MIT
pragma solidity ^0.8.0;
import "./Squad.sol";
import "./SquadFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract League is Ownable {
  event SquadCreated(address newAddress, uint256 squadId);
  event SquadJoined(address member, uint256 squadId);
  event CollectibleRedeemed(address member, uint256 collectibleTokenId);

  bytes public matchMerkleRoot;
  bytes public playerMerkleRoot;
  bytes public winnerMerkleRoot;
  uint256 maxSquadsAllowed;
  string name;
  string description;
  mapping(uint256 => address) public squadAddresses;
  Squad[] public squads;
  constructor(string memory _name, string memory _description, uint256 _maxSquadsAllowed){
    maxSquadsAllowed = _maxSquadsAllowed;
    name = _name;
    description = _description;
    
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
        "Address does not exist in list"
    );
    _;
  }

  function createSquad(string memory _baseURI, string memory _contractURI) public maxSquads returns (uint256){
    Squad newSquad = new Squad(squads.length + 1, _baseURI, _contractURI); 
    uint256 index = squads.length + 1;
    squads.push(newSquad);
    squadAddresses[index] = address(newSquad);
    emit SquadCreated(address(newSquad), index);
    return index;
  }

  function joinSquad(uint _index) notInOtherSquad public {
    require(_index <= squads.length, "Squad does not exist");
    Squad squad = Squad(squads[_index]);
    squad.join();
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

  function setMatchMerkleRoot(bytes memory _matchMerkleRoot) external onlyOwner {
    matchMerkleRoot = _matchMerkleRoot;
  }
  function setWinnerMerkleRoot(bytes memory _winnerMerkleRoot) external onlyOwner {
    winnerMerkleRoot = _winnerMerkleRoot;
  }
  function setPlayerMerkleRoot(bytes memory _playerMerkleRoot) external onlyOwner {
    playerMerkleRoot = _playerMerkleRoot;
  }

  function squadMembers(uint256 _squadId) public view returns (address[] memory) {
    Squad squad = Squad(squads[_squadId]);
    return squad.getMembers();
  }

  function getSquads() public view returns (Squad[] memory){
    return squads;
  }
}