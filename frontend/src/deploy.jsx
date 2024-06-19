const { ethers } = require("ethers");

async function main() {
  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:5173"); // Replace with your network's RPC URL
  
  // Get the first account
  const signer = provider.getSigner();

  // Compile your contract
  const contractFactory = await new ethers.ContractFactory("YourContract", `
  // Your contract ABI
  `).deploy(signer);
  
  console.log("Deploying contract...");
  const contract = await contractFactory.deployed();

  console.log("Contract deployed at address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
