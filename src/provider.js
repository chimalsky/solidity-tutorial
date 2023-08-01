const ethers = require("ethers");
require('dotenv').config();

const provider = ethers.getDefaultProvider("goerli", {
  infura: process.env.INFURA,
});

module.exports = provider;
