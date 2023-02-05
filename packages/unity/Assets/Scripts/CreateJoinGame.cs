using UnityEngine;
using UnityEngine.SceneManagement;
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
        SceneManager.LoadScene("3 - join");
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
        string abi = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"gameId\",\"type\":\"uint256\"}],\"name\":\"executeTyped\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
        // address of contract
        string contract = Mud.SYSTEM_INIT;

        // method you want to write to
        string method = "executeTyped";
        // equivalent to sending empty bytes as arg
        string gameIdHex = PlayerData.gameIdHex();
        Debug.Log("Game ID hex: " + gameIdHex);

        // connects to user's browser wallet to call a transaction
        string response = await Web3GL.SendContract(method, abi, contract, gameIdHex, "0", "", "");
        Debug.Log("Got response");
        print(response);
        return response;
    }

}
