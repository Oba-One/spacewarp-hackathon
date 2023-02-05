using Newtonsoft.Json;

public static class Mud
{
    public readonly static string RPC_URI = "https://follower.testnet-chain.linfra.xyz";
    public readonly static string WORLD_ADDRESS = "0xD198b7Ac1d3e0B87ea7C945653c268be56F2deEB";
    public readonly static string ASSET_COMPONENT = "0x0D5D52723D834E0cf9CDF1B3102756053955A5e0";
    public readonly static string OWNEDBY_COMPONENT = "0x19257125D7750F8bC6373e67d5b4ef7BfF3Fb4EE";
    public readonly static string INGAME_COMPONENT = "0x1A56C51f6EfB8ecbce7f2a8D1B33740a3b080610";

    public readonly static string SYSTEM_INIT = "0xEBddf987228dfe324773E9616cD72272Df8F0058";

    public readonly static string GET_ENTITIES_WITH_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"getEntitiesWithValue\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    public readonly static string GET_VALUE_ABI = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"entity\",\"type\":\"uint256\"}],\"name\":\"getValue\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    
    
    public static string[] AdaptMudResp2StringArr(string mudResp) {
        return JsonConvert.DeserializeObject<string[]>(mudResp);
    }
}
