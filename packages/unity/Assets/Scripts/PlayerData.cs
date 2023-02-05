using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class PlayerData
{
    public static int gameId { get; set; }

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
