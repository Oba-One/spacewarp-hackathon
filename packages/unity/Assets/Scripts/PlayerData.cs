using UnityEngine;

public static class PlayerData
{
    public static int gameId { get; set; }

    public static string gameIdHex() {
       return  "0x" + PlayerData.gameId.ToString("X64");
    }

    public static int GenGameId()
    {
        int start = 1;
        int end = 99999;
        return Random.Range(start, end);
    }
}
