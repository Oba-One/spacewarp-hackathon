using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using Newtonsoft.Json;
using System.Threading.Tasks;

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

    public async void CreateGame()
    {
        PlayerData.gameId = PlayerData.GenGameId();
        Debug.Log("Setting game ID to " + PlayerData.gameId);
        // await Transfer();
        string response = await MudSystemInit();
        if (response.Length > 0)
        {
            Debug.Log("Response is valid");
            SceneManager.LoadScene(3);
        }
        else
        {
            Debug.Log("Response is NOT valid");
        }
    }

    public async Task<string> MudSystemInit()
    {
        Debug.Log("Calling MudSystemInit");
        string abi = "[{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"execute\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
        // address of contract
        string contract = Mud.SYSTEM_INIT;

        // method you want to write to
        string method = "execute";
        // equivalent to sending empty bytes as arg
        string args = "[[]]";
        string argsSerialized = JsonConvert.SerializeObject(args);
        Debug.Log(argsSerialized);
        // connects to user's browser wallet to call a transaction
        string response = await Web3GL.SendContract(method, abi, contract, argsSerialized, "0", "", "");
        Debug.Log("Got response");
        print(response);
        return response;
    }

}
