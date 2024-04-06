// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MerkleRootManager is Ownable {
    mapping(uint256 => bytes32) private _merkleRoots;
    bytes32 public predefinedMerkleRoot = keccak256(abi.encodePacked("0x123abc456def7890001112233445566778899aabbccddeeff0011223344556677"));

    constructor(address initialOwner) Ownable(initialOwner) {}

    event MerkleRootAdded(uint256 indexed itemId, bytes32 indexed merkleRoot);

    // Function to add a Merkle root for a specific item
    function addMerkleRoot(uint256 itemId, bytes32 merkleRoot) public onlyOwner {
        require(_merkleRoots[itemId] == bytes32(0), "Item already has a Merkle root.");
        _merkleRoots[itemId] = merkleRoot;
        emit MerkleRootAdded(itemId, merkleRoot);
    }
    

    // Function to retrieve the Merkle root of an item
    function getMerkleRoot(uint256 itemId) public view returns (bytes32) {
        require(_merkleRoots[itemId] != bytes32(0), "Merkle root does not exist.");
        return _merkleRoots[itemId];
    }
}
