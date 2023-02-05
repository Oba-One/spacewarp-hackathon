using UnityEngine;

public static class PlayerData
{
    public static int gameId { get; set; }

<<<<<<< HEAD
    public static string gameIdHex() {
       return  "0x" + PlayerData.gameId.ToString("X64");
    }

=======
>>>>>>> 83dfb0ec83306c72bc39b41911b99b8a0a94490e
    public static int GenGameId()
    {
        int start = 1;
        int end = 99999;
        return Random.Range(start, end);
        // const string glyphs= "ABCDEFG0123456789";
        // string s = "";
        
        // for(int i=0; i<4; i++)
        // {
        //     s += glyphs[Random.Range(0, glyphs.Length)];
        // }


        // return s;
    }
}
