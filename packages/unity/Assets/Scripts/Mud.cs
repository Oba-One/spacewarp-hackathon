using Newtonsoft.Json;

public static class Mud
{
    public readonly static string RPC_URI = "https://follower.testnet-chain.linfra.xyz";
    public readonly static float POLL_INTERVAL_SECS = 10f;

    // World
    public readonly static string WORLD_ADDRESS = "0x71158F752678238c1260859fe7e1709CB956EE76";

    // Components
    public readonly static string ASSET_COMPONENT = "0x4105334c031eC0040112a7e6d1eDb237c21b43cB";
    public readonly static string OWNEDBY_COMPONENT = "0x76bFa758ca1380dc07D4c7237cA375CcD99Fcb1F";
    public readonly static string POSITION_COMPONENT = "0x055FE8a4A3356B6ca79398a4C5a881a224d1f053";
    public readonly static string MATCH_COMPONENT = "0x3DDdf14A82f4541B9a16A35f0617E861A65866A4";
    public readonly static string INGAME_COMPONENT = "0x402Ae0f3925be21E2C98213F36C5259593B677DB";
    public readonly static string ZONE_COMPONENT = "0x35a93e84428BAC803916c5074eCBEc73a4990141";

    // Systems
    public readonly static string SYSTEM_INIT = "0xa80688399f68b82cA0b848F13461d31433C85C99";

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
