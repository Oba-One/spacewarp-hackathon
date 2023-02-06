// mud deploy --deployerPrivateKey 0x687726fda5e7a1720744fed697b27de01d9ce546876e7deff5f94147041e6d41 --chainSpec chainSpec.json --world 0xa0666Bb43E39eD414e52c0A207d565FF9501B473

const { ethers, BigNumber } = require("ethers");
const _ = require('lodash');
const provider = new ethers.providers.JsonRpcProvider('https://follower.testnet-chain.linfra.xyz');

const GAME_ID = 15397;

// Components
const ASSET_COMPONENT = "0x5C7b066997326318A124e516C342E8F9705952F0"
const OWNEDBY_COMPONENT = "0xEccc5EB5a070ea00ED719bF753DD2aa6e85efB11"
const IDENTITY_COMPONENT = "0xd9E671Df3E4a4b5d4eD3e8d9E38D8b01350c9681"
const MATCH_COMPONENT = "0xfcA4eB046FA1B5b02E1a9Ef35D2bCC4c9966Ada1"
const INGAME_COMPONENT = "0x8bcf4fee7Ac96a892A021b4A7EE4e798B5FE4364"

// Systems
const INIT_SYSTEM = "0xE6C669AD6fc339Ff2f69BF4E7a729Dffcf112E36"

// Fixed
const SQUAD_DEPLOYER_PK = "0x687726fda5e7a1720744fed697b27de01d9ce546876e7deff5f94147041e6d41"
const MUD_DEPLOYER_PK = "0x26e86e45f6fc45ec6e2ecd128cec80fa1d1505e5507dcd2ae58c3130a7a97b48"
const DEPLOYER_PK = MUD_DEPLOYER_PK

const printEntities = (entities) => {
    entities.forEach(entity => console.log(entity.toString()));
}

const num2Uint256 = (num) => {
    const uint256 =  ethers.utils.hexZeroPad(ethers.utils.hexlify(num), 64)
    console.log(`Converted ${num} to ${uint256}`)
    return uint256
}

const entitiesInCommon = (entitiesA, entitiesB) => {
    const a = entitiesA.map(entity => entity.toString())
    const b = entitiesB.map(entity => entity.toString())
    const inCommon = a.filter(entity => b.includes(entity))
    return inCommon.map(entity => BigNumber.from(entity))
}

provider.getBlockNumber().then(blockNum => {
    console.log(`Block number: ${blockNum}`)
    console.log(blockNum)
})

const getMatches = async () => {
    const abi = [
        "function getEntities() view returns (uint256[])"
    ]
    const contract = new ethers.Contract(MATCH_COMPONENT, abi, provider);
    const entities = await contract.getEntities()
    console.log('Matches:')
    // console.log(entities[0].toString())
    printEntities(entities)
    return entities
}

const getEntities = async () => {
    const abi = [
        "function getEntities() view returns (uint256[])"
    ]
    const contract = new ethers.Contract(OWNEDBY_COMPONENT, abi, provider);
    const entities = await contract.getEntities()
    console.log('Entities:')
    console.log(entities)
    return entities
}

const getIdentity = async (entityId) => {
    const abi = [
        "function getValueTyped(uint) view returns (string,string)"
    ]
    const contract = new ethers.Contract(IDENTITY_COMPONENT, abi, provider);
    const identity = await contract.getValueTyped(entityId)
    console.log('Identity:')
    console.log(identity)
    return identity
}

const getMatchValue = async (matchId) => {
    const abi = [
        "function getValue(uint) view returns (uint,uint,uint8)"
    ]
    const contract = new ethers.Contract(IDENTITY_COMPONENT, abi, provider);
    const identity = await contract.getValueTyped(entityId)
    console.log('Identity:')
    console.log(identity)
    return identity
}

const getEntitiesOwnedBy = async (playerId) => {
    const abi = [
        "function getEntitiesWithValue(uint256) view returns (uint256[])"
    ]
    const contract = new ethers.Contract(OWNEDBY_COMPONENT, abi, provider);
    const players = await contract.getEntitiesWithValue(playerId)
    console.log('getEntitiesOwnedBy:')
    printEntities(players)
    return players
}

const getEntitiesInGame = async (gameId) => {
    const abi = [
        "function getEntitiesWithValue(uint256) view returns (uint256[])"
    ]
    const contract = new ethers.Contract(INGAME_COMPONENT, abi, provider);
    const players = await contract.getEntitiesWithValue(gameId)
    console.log('getEntitiesInGame:')
    printEntities(players)
    return players
}

const getCharactersOwnedByPlayerInGame = async (playerId, gameId) => {
    console.log("\n# Characters owned by player")
    const charactersOwnedByPlayer = await getEntitiesOwnedBy(playerId)

    console.log("\n# Characters in game")
    const charactersInGame = await getEntitiesInGame(gameId)

    console.log('\n # Characters in game owned by player')
    const ownedByPlayerInGame = entitiesInCommon(charactersOwnedByPlayer, charactersInGame)
    printEntities(ownedByPlayerInGame)
}

const getValue = async (entityId) => {
    console.log('getValue')
    console.log(entityId.toString())
    const abi = [
        "function getValue(uint) view returns (string)"
    ]
    const contract = new ethers.Contract(ASSET_COMPONENT, abi, provider);
    const value = await contract.getValue(entityId.toString())
    console.log(`Entity ${entityId}: ${value}`)
}


const initSystem = async (gameId) => {
    let wallet = new ethers.Wallet(DEPLOYER_PK)
    wallet = wallet.connect(provider)
    const abi = [
        "function executeTyped(uint, uint, uint)"
        // "function execute(bytes)"
    ]
    const contract = new ethers.Contract(INIT_SYSTEM, abi, provider);
    const signedContract = contract.connect(wallet)
    console.log(`Signer is ${JSON.stringify(signedContract.signer)}`);
    const teamId = '0x0000000000000000000000000000000000000000000000000000000000000003'
    const playerNum = '0x0000000000000000000000000000000000000000000000000000000000000002'
    
    const resp = await signedContract.executeTyped(gameId, teamId, playerNum)
    console.log('Execute resp:')
    console.log(resp)
    await getMatches();

}

const main = async () => {
    // const gameId = num2Uint256(GAME_ID)
    0x67b1d87101671b127f5f8714789C7192f7ad340e
    const player = '0x67b1d87101671b127f5f8714789C7192f7ad340e'; // mud
    // const player = '0x8815f73D79E075eec86605C813DEA3bE026a8da9'; // squad
    const gameId = '0x0025f73D79E075eec87605C813DEA3bE036a9da9'
    // await getValue("0x0E015F902C527607628F7649074B24D3EFD1151F9F546CE1AECF38852C06DA883")
    // await getEntitiesOwnedBy("0x8815f73D79E075eec86605C813DEA3bE026a8da9")
    await initSystem(gameId)
    const characters = await getCharactersOwnedByPlayerInGame(player, gameId)
    // const playersOwnedByGame = await getEntitiesOwnedBy(gameId)
    // playersOwnedByGame.forEach(async (player) => {
    //     console.log("Got player " + player)
    //     await getIdentity(player)

    //     // const characters = await getCharactersOwnedByPlayerInGame(player, gameId)
    // });
    // const entities = await getEntities();
    // entities.forEach(entityId => {
        // getValue(entityId)
    // });
    // await getIdentity(player)
}

main()

// console.log(parseInt("0x8815f73D79E075eec86605C813DEA3bE026a8da9"))


