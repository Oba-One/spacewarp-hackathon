using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class PlayerData
{
    public static string gameId { get; set; }

    public static string GenGameId()
    {
        const string glyphs= "ABCDEFG0123456789";
        string s = "";
        
        for(int i=0; i<4; i++)
        {
            s += glyphs[Random.Range(0, glyphs.Length)];
        }

        return s;
    }
}
