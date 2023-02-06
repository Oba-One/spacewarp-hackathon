using Newtonsoft.Json;

public static class Mud
{
    public readonly static string RPC_URI = "https://follower.testnet-chain.linfra.xyz";
    public readonly static float POLL_INTERVAL_SECS = 10f;

    // World
    public readonly static string WORLD_ADDRESS = "0x46E69aAe78E2df6a8a72E45eE6c5dA2904cdaB04";

    // Components
    public readonly static string ASSET_COMPONENT = "0xEfE20c73f64bd3e995C271bfca7eaf76F27c9206";
    public readonly static string OWNEDBY_COMPONENT = "0x492d77998F9E0549A3c75035faFC1c8051DeaCE4";
    public readonly static string POSITION_COMPONENT = "0xc27Df43AbDb760c02912328d99A0a575378F7e73";
    public readonly static string MATCH_COMPONENT = "0xE8c775a6B5d4994097a9F6Ed950a306B42400Aa3";
    public readonly static string INGAME_COMPONENT = "0x001333715e8500cB83775746B347384A675b37C0";
    public readonly static string ZONE_COMPONENT = "0x74C154b1d4966Cd64daEbE00579E339500cf729F";

    // Systems
    public readonly static string SYSTEM_INIT = "0x57d873217e90A6b47cc27BFb06eB930EB5C5D3cc";

    // ABIs
    // https://www.freeformatter.com/json-escape.html
    public readonly static string GET_ENTITIES_WITH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"getEntitiesWithValue\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_STRING_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_MATCH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"startedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"finishedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"turnsLeft\",\"type\":\"uint8\"}],\"internalType\":\"struct MatchType\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_ENUM_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValueTyped\",\"outputs\":[{\"internalType\":\"enum PositionEnum\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string EXECUTE_INIT_SYSTEM_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"gameId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"teamId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"playerNum\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"executeTyped\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}]}]";
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
