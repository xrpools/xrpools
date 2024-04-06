const crypto = require('crypto');

// Define the hash function using SHA-256
function hash(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

// Hash the public key data
const publicKeyData = "ED8C6128E8218137CB56C92C0794FE350D1849381544E90489AB18C9D5C0D85043";
const publicKeyHash = hash(publicKeyData);

// Leaf hashes from your Merkle tree
const leafHashes = [
    "35135aaa6cc23891b40cb3f378c53a17a1127210ce60e125ccf03efcfdaec458",
    "2f55b6a2f90f0658e25ed69ab2a7bdeecde4633433f38989a2930ae899ed1235",
    "db74c940d447e877d119df613edd2700c4a84cd1cf08beb7cbc319bcfaeab97a",
    "3013b18f4387bbe12cdb6d3ba9aa45a36adce32485da62113f97163f16beda66",
    "79737ac46dad121166483e084a0727e5d6769fb47fa9b0b627eba4107e696078",
    "817d874871be71f1f9a4371b8d1a3720d2ed8aceaf39618f9519d19990e32e76"
];

// Function to check if the public key hash is in the list of leaf hashes
function isHashInLeaves(leafHashes, targetHash) {
    return leafHashes.includes(targetHash);
}

// Check if the public key hash is included in the leaves
const isIncluded = isHashInLeaves(leafHashes, publicKeyHash);
console.log("Is the public key hash included in the leaves? ", isIncluded ? "Yes" : "No");
