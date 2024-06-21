const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

module.exports = provider;
