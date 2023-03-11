/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"goerli",
  networks: {
    hardhat:{},
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: ["6a93c03124c83995f4120e2ebef287dc5a2939271d28cbc1e938960346838c03"],
    },
  },
  
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};