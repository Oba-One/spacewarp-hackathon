using Newtonsoft.Json;

public static class Mud
{
    public readonly static string RPC_URI = "https://follower.testnet-chain.linfra.xyz";
    public readonly static float POLL_INTERVAL_SECS = 15f;

    // World
    public readonly static string WORLD_ADDRESS = "0x9fC0D7787840Fba30C0BD2c646E6ae5c3296808D";

    // Components
    public readonly static string ASSET_COMPONENT = "0xdeD9b869B82831c60FeC3d5fE16b3779A8144a96";
    public readonly static string OWNEDBY_COMPONENT = "0xa244BBC245A065229c2CE9B5Ea80BED86d596Fb8";
    public readonly static string POSITION_COMPONENT = "0x956f2F8622Ba1Ae2e3934Db023597d34aeDe2ea9";
    public readonly static string MATCH_COMPONENT = "0x4E9263628b223Dd47768cb455e82Cad21eeC472f";
    public readonly static string INGAME_COMPONENT = "0xDd7a3ab0553d1F09ffC415804C9E2fc7da70E2d2";
    public readonly static string ZONE_COMPONENT = "0xa169a6F61165762336D623EB0B1d520CBAb8F523";

    // Systems
    public readonly static string SYSTEM_INIT = "0x1Ba63a75F4828cb7DfB5BA581486B85670CFd2c8";
    public readonly static string MOVE_CHARACTER_SYSTEM = "0x5F072B32BF44BFF569Ae0149563D1BFfCD7087f3";

    // ABIs
    // https://www.freeformatter.com/json-escape.html
    public readonly static string GET_ENTITIES_WITH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"getEntitiesWithValue\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_STRING_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_MATCH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"startedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"finishedAt\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"turnsLeft\",\"type\":\"uint8\"}],\"internalType\":\"struct MatchType\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_ENUM_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValueTyped\",\"outputs\":[{\"internalType\":\"enum PositionEnum\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string EXECUTE_INIT_SYSTEM_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"gameId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"teamId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"playerNum\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"executeTyped\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}]}]";
    public readonly static string MOVE_CHARACTER_SYSTEM_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"characterId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"positionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"zoneId\",\"type\":\"uint256\"}],\"name\":\"executeTyped\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
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
