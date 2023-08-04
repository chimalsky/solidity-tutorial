const ethers = require("ethers");

const wallet = ethers.Wallet.createRandom();

console.log(`Private: ${wallet.privateKey}`);
console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);


