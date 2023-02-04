// SPDX-license-identifier: MIT
pragma solidity ^0.8.0;
import "./Squad.sol";
import "./SquadFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract League {
    event SquadCreated(address newAddress, uint256 squadId);
    bytes public matchMerkleRoot;
    bytes public playerMerkleRoot;
    bytes public winnerMerkleRoot;

    mapping(uint256 => address) public squads;
    modifier notInOtherSquad(){
      for(uint i = 0; i < _squads.length; i++){
        Squad squad = _squads[i];
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

  function createSquad() public returns (uint256){
    Squad newSquad = new Squad(); 
    uint256 index = squads.length++;
    squads[index] = address(newSquad);
    emit SquadCreated(address(d), index);
    return index;
  }

  function getSquads() public view returns (Squad[] memory coll){
    return _squads;
  }

  function joinSquad(uint _index) notInOtherSquad public {
    require(index <= squads.length, "Squad does not exist");
    Squad squad = Squad(squads[_index]);
    squad.join();
  }
  function isMember(address member) public view returns (bool) {
    for (uint i = 0; i < _squads.length; i++) {
        Squad squad = _squads[i];
        if (squad.isMember(member)) {
            return true;
        }
    }
    return false;
  }
    function squadMembers(uint256 _squadId) public view returns (address[] memory) {
        Squad squad = Squad(squads[_squadId]);
        return squad.members();
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

}