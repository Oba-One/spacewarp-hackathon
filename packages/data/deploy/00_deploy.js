require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    //deploy DAO
    const TeamDAO = await ethers.getContractFactory("TeamDAO", wallet)
    console.log("Deploying Team DAO...")
    const teamDAO = await TeamDAO.deploy(tokensToBeMinted)
    await teamDAO.deployed()
    console.log("TeamDAO deployed to:", teamDAO.address)

    //deploy FilecoinMarketConsumer
    const FilecoinMarketConsumer = await ethers.getContractFactory("FilecoinMarketConsumer", wallet)
    console.log("Deploying FilecoinMarketConsumer...")
    const filecoinMarketConsumer = await FilecoinMarketConsumer.deploy()
    await filecoinMarketConsumer.deployed()
    console.log("FilecoinMarketConsumer deployed to:", filecoinMarketConsumer.address)
}
