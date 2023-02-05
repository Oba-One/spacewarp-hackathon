using Newtonsoft.Json;

public static class Mud
{
    public readonly static string RPC_URI = "https://follower.testnet-chain.linfra.xyz";
    public readonly static string WORLD_ADDRESS = "0x9e234e08c627Dc5742015aE5CcA7bA81dB112433";
    public readonly static string ASSET_COMPONENT = "0xc108A97e8033E2e5F5fb2b4E08c88f61290C44A9";
    public readonly static string OWNEDBY_COMPONENT = "0xe5BFD45D577b68BA4aDb2E25465a91170165DB6D";
    public readonly static string INGAME_COMPONENT = "0xF6D1085C4aE472D81160E0fa885610d04A35C787";
    public readonly static string MATCH_COMPONENT = "0xde10DD74edeaAb727F076232c981a690A8f4AcE6";

    public readonly static string SYSTEM_INIT = "0x8fB1d94f97f8a31bccd93fff838ccF1968D0Beb3";

    // https://www.freeformatter.com/json-escape.html
    public readonly static string GET_ENTITIES_WITH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"getEntitiesWithValue\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_STRING_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_MATCH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"startedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"finishedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"turnsLeft\",\"type\":\"uint8\"}],\"internalType\":\"struct MatchType\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    
    public static string[] AdaptMudResp2StringArr(string mudResp) {
        return JsonConvert.DeserializeObject<string[]>(mudResp);
    }

    public static string TeamId2Name(int teamId)
    {
        switch (teamId)
        {
            case 1:
                return "water";
            case 2:
                return "earth";
            case 3:
                return "fire";
            case 4:
                return "air";
            default:
                return "water";
        } 
    }
}
