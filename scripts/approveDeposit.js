const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/FunnyCats.sol/FunnyCats.json");
require("dotenv").config();

async function main() {
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/7mXFDS2YcwySywIsk9o2lGMODBzxcT5U";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);

  
  const [signer] = await ethers.getSigners();

  
  const NFT = await ethers.getContractFactory("FunnyCats");
  const ethNFTAddress = await NFT.attach("0xA76E704545c656a9f3c20711759A28987116BcC8"); 

  
  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  
  const tokenIds = [0, 1, 2, 3, 4];



  // changed from here
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    
    const approveTx = await ethNFTAddress.connect(signer).approve(fxRootAddress, tokenId);
    await approveTx.wait();
    console.log(`NFT with Token ID ${tokenId} approved for transfer`);
  }

  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const depositTx = await fxRoot.connect(signer).deposit(ethNFTAddress.address, wallet.address, tokenId, "0x6566");
    await depositTx.wait();
    // console.log(`NFT with Token ID ${tokenId} transferred and deposited to Mumbai address);
  }

  console.log("NFT : FunnyCats");
  console.log("Approved and deposited");

  
  console.log("NFT balance on Polygon Network ")
  const Etherbalance = await ethNFTAddress.balanceOf(wallet.address);
  console.log(" NFT's Holding in wallet:",wallet.address.toString());


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });