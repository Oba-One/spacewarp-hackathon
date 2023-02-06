using UnityEngine;
using UnityEngine.SceneManagement;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

public class CreateJoinGame : MonoBehaviour
{

    [DllImport("__Internal")]
    private static extern void GameCode(int code);


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
        SceneManager.LoadScene("3 - join");
    }

    public async void CreateGame()
    {
        PlayerData.gameId = PlayerData.GenGameId();
        Debug.Log("Setting game ID to " + PlayerData.gameId);
        PlayerData.playerNum = 1;
        string response = await MudSystemInit();
        if (response.Length > 0)
        {
            Debug.Log("Response is valid");
            if (Application.platform == RuntimePlatform.WebGLPlayer) {
                GameCode(PlayerData.gameId);
            }
            SceneManager.LoadScene("4 - play");
        }
        else
        {
            Debug.Log("Response is NOT valid");
        }
    }

    public async Task<string> MudSystemInit()
    {
        Debug.Log("Calling MudSystemInit");
        string abi = Mud.EXECUTE_INIT_SYSTEM_ABI;
        // address of contract
        string contract = Mud.SYSTEM_INIT;

        // method you want to write to
        string method = "executeTyped";
        // equivalent to sending empty bytes as arg
        string gameIdHex = PlayerData.gameIdHex();
        string teamIdHex = PlayerData.teamIdHex();
        string playerNumHex = PlayerData.playerNumHex();
        Debug.Log("Game ID hex: " + gameIdHex);
        string[] args = {gameIdHex, teamIdHex, playerNumHex};
        string argsSerialized = JsonConvert.SerializeObject(args);

        // connects to user's browser wallet to call a transaction
        string response = await Web3GL.SendContract(method, abi, contract, argsSerialized, "0", "", "");
        Debug.Log("Got response");
        print(response);
        return response;
    }

}
