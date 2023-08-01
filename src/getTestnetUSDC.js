const ethers = require("ethers");
const wallet = require("./wallet");
const provider = require("./provider");

// this doesn't work because 0x07865c6E87B9F70255377e024ace6630C1Eaa37F
// is an actual testnet USDC contract. This means it doesn't have a
// gimmeSome() function
// Keeping here to align this code with the tutorial's

async function main() {
  const account = wallet.connect(provider);

  const usdc = new ethers.Contract(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    ["function gimmeSome() external"],
    account
  );

  const tx = await usdc.gimmeSome({ gasPrice: 20e9 });
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  console.log(`Gas used: ${receipt.gasUsed.toString()}`);
}

main();
