const hre = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    // Get the contract factory
    const NFT = await hre.ethers.getContractFactory("FunnyCats");

    // Deploy the contract
    const nft = await NFT.deploy();

    // Wait for the contract to be deployed
    await nft.deployed();

    // Log the contract address
    console.log("NFT contract deployed to:", nft.address);

    // Export the contract address
    fs.writeFileSync(
      "metadata/contractAddress.js",
      `export const nftAddress = "${nft.address}";\n`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Execute the deployment function
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});