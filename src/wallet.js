const ethers = require("ethers");
require('dotenv').config();

// Replace the following with your own mnemonic
const mnemonic = process.env.SEED;
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;
