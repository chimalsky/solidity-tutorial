const ethers = require("ethers");
const wallet = require("./wallet");
const provider = require("./provider");

// The ABI for the USDC contract
const usdcAbi = [
  "function transfer(address to, uint256 value) public returns (bool)",
];

// The address where the USDC contract is deployed
const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

async function main(args) {
  const account = wallet.connect(provider);
  let to, value;

  // Parse the first argument - recipient address
  try {
    to = ethers.utils.getAddress(args[0]);
  } catch {
    console.error(`Invalid recipient address: ${args[0]}`);
    process.exit(1);
  }

  // Parse the second argument - amount
  try {
    // Need to convert from human-readable form to smallest unit for ERC-20 tokens
    value = ethers.utils.parseUnits(args[1], 6);
    if (value.isNegative()) {
      throw new Error();
    }
  } catch {
    console.error(`Invalid amount: ${args[1]}`);
    process.exit(1);
  }
  const valueFormatted = ethers.utils.formatUnits(value, 6);

  console.log(`Transferring ${valueFormatted} USDC to ${to}...`);

  // Get contract instance
  const contract = new ethers.Contract(usdcAddress, usdcAbi, account);

  // Call the transfer function
  const tx = await contract.transfer(to, value);
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
}

main(process.argv.slice(2));
