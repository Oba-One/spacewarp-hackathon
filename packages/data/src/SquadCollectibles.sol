// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@solmate/src/tokens/ERC1155.sol";

// make erc1155 contract for each squad
contract SquadCollectibles is ERC1155 {
  constructor() public {}

  function mintCollectible() {}

  function receiveOnJoin(address _to, uint256 squadId) internal {
    _mint(_to, squadId, 1, "");
  }
}
