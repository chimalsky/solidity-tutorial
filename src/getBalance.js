const ethers = require("ethers");
const wallet = require("./wallet");
const provider = require("./provider");

async function main() {
  const account = wallet.connect(provider);

  // Define contract interface
  const usdc = new ethers.Contract(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    [
      "function balanceOf(address _owner) public view returns (uint256 balance)",
    ],
    account
  );

  const ethBalance = await account.getBalance();
  console.log(`ETH Balance: ${ethers.utils.formatEther(ethBalance)}`);

  const usdcBalance = await usdc.balanceOf(account.address);
  console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);
}

main();
