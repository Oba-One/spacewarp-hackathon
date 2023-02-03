// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@solmate/src/tokens/ERC1155.sol";

// make erc1155 contract for each squad
contract SquadCollectibles is ERC1155 {
  string public name;
  string public symbol;
  string public baseURI;
  string public contractURI;
  //  @junaama FIX: collectibleIds need to be reserved so it doesnt clash with squad ids in an extensible/composable manner
  uint256 collectibleId = 4;
  struct Collectible {
    bytes metadata;
    bool created;
    address minter;
  }
  mapping(uint256 => Collectible) public collectibles;

  // collectibles[]

  modifier notSquadId(uint256 _collectibleId) {
    require(_collectibleId > 3, "Collectible cannot be a squad id");
    _;
  }

  constructor(string memory _baseURI, string memory _contractURI) public {
    baseURI = _baseURI;
    contractURI = _contractURI;
  }

  function createNewCollectible(
    uint256 tokenId,
    bytes calldata metadataLink
  ) external onlyOwner {
    require(
      !collectibles[tokenId].created,
      "Collectible token already created"
    );
    collectibles[tokenId].metadata = metadataLink;
    collectibles[tokenId].created = true;
  }

  function mintCollectible(
    address to,
    bytes calldata data,
    uint256 tokenId
  ) public notSquadId {
    require(collectibles[tokenId].created, "Collectible token not created");
    _mint(to, tokenCount + 1, 1, data);
  }

  function receiveOnJoin(address _to, uint256 squadId) internal {
    require(collectibles[minter] == address(this), "Only internal minter");
    _mint(_to, squadId, 1, "");
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

  function withdraw(address payable to) external onlyOwner {
    uint256 balance = address(this).balance;
    (bool succ, ) = to.call{ value: balance }("");
    if (!succ) revert("Transfer failed");
  }
}
