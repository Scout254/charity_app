/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://rpc-mumbai.matic.today",
      accounts: ["6a93c03124c83995f4120e2ebef287dc5a2939271d28cbc1e938960346838c03"],
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};