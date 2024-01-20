# ERC721 Goerli to Mumbai Bridge Using fxPortal
This project demonstrates how to use the fxPortal contracts to transfer ERC721 tokens from Goerli to Mumbai.

### Steps for Bridging

1. Run npm i to install dependencies
2. Put your private key in the .env.examples file and rename to .env when finished
3. Run `npx hardhat run scripts/deploy.js --network goerli` to deploy FunnyCats contract
4. Paste the newly deployed contract address in the tokenAddress variable for the other scripts
5. Make sure to fill in your public key
6. Run `npx hardhat run scripts/batchMint.js --network goerli` to mint NFTs to your wallet
7. Run `npx hardhat run scripts/approveDeposit.js --network goerli` to approve and deposit your tokens to polygon
8. Wait 20-30ish minutes for NFTs to show on polygon account
9. Use polyscan.com to check your account for the tokens. Once they arrive, you can click on the transaction to get the contract address for polygon.
