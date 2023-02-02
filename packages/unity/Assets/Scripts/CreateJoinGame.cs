using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CreateJoinGame : MonoBehaviour
{
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void JoinGame()
    {
        SceneManager.LoadScene(2);
    }

    public void CreateGame()
    {
        PlayerData.gameId = PlayerData.GenGameId();
        Debug.Log("Setting game ID to " + PlayerData.gameId);
        SceneManager.LoadScene(3);
    }
}
