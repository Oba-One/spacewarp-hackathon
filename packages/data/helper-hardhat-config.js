/** @type import('hardhat/config').HardhatUserConfig */
const networkConfig = {
    3141: {
        name: "hyperspace",
        tokensToBeMinted: 12000,
    },
    5: {
        name: "goerli",
    },
}

// const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    // developmentChains,
}
