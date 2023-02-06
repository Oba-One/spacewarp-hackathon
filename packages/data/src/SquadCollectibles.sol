// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@solmate/tokens/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// make erc1155 contract for each squad
contract SquadCollectibles is ERC1155, Ownable {
  using Strings for uint256;
  string public name;
  string public symbol;
  string public baseURI;
  string public contractURI;
  
  struct Collectible {
    bytes metadata;
    bool created;
    address minter;
  }
  mapping(uint256 => Collectible) public collectibles;
  uint256 public collectibleEditions;

  modifier notSquadId(uint256 _collectibleId) {
    require(_collectibleId > 0, "Collectible cannot be a squad id");
    _;
  }

  constructor(string memory _baseURI, string memory _contractURI) {
    baseURI = _baseURI;
    contractURI = _contractURI;
    collectibles[0].created = true;
    collectibles[0].minter = address(this);
  }

  function createNewCollectible(
    uint256 tokenId,
    bytes calldata metadataLink
  ) public onlyOwner {
    require(
      !collectibles[tokenId].created,
      "Collectible token already created"
    );
    collectibles[tokenId].metadata = metadataLink;
    collectibles[tokenId].created = true;
  }

  function mintCollectible(
    address to,
    uint256 tokenId
  ) internal notSquadId(tokenId) {
    require(collectibles[tokenId].created, "Collectible token not created");
    _mint(to, tokenId, 1, "");
  }

  function receiveOnJoin(address _to) internal {
    _mint(_to, uint256(uint160(msg.sender)), 1, "");
  }

  function uri(uint256 id) public view override returns (string memory) {
    string memory base = baseURI;
    return string(abi.encodePacked(base, id.toString()));
  }

  function setBaseURI(string calldata _baseURI) public {
    baseURI = _baseURI;
  }

  function setContractURI(string calldata _contractURI) public {
    contractURI = _contractURI;
  }

  function withdraw(address payable to) public onlyOwner {
    uint256 balance = address(this).balance;
    (bool succ, ) = to.call{ value: balance }("");
    if (!succ) revert("Transfer failed");
  }
}
