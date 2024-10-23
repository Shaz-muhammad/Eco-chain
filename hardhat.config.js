require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.20",  // Updated Solidity version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: "./src/backend/artifacts",  // Path to save artifacts
    sources: "./src/backend/contract",     // Path to smart contracts
    cache: "./src/backend/cache",          // Path to cache
    tests: "./src/backend/test"            // Path to test files
  },
  networks: {
    hardhat: {
      accounts: {
        count: 10,  // Number of accounts to generate
        accountsBalance: "10000000000000000000000"  // 10,000 ETH per account (10,000 * 10^18 wei)
      }
    }
  }
};
