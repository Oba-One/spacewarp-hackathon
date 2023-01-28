using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using TMPro;
using Newtonsoft.Json;
using System.Numerics;


public class GameManager : MonoBehaviour
{
    [SerializeField]
    private Image profileImage;

    [SerializeField]
    private TextMeshProUGUI account;

    [SerializeField]
    private TextMeshProUGUI count;

    private bool isAccountSet = false;
 
    IEnumerator GetTexture(string url) {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(url);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
            Debug.Log(www.downloadHandler.error);
        }
        else {
            Texture2D texture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            Sprite sprite = Sprite.Create(texture,
            new Rect(0, 0, texture.width, texture.height), UnityEngine.Vector2.zero);

            profileImage.sprite = sprite;
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        LoadNewImage();
    }

    void Update()
    {
        if (!isAccountSet)
        {
            account.text = PlayerPrefs.GetString("Account");
        }
    }

    public void LoadNewImage()
    {
        string uri = "https://cloudflare-ipfs.com/ipfs/bafybeig42df63mzynufa4fbj3g7e4th2nyjp77iceekgeyqy7j6rabq2xi/marvel-avengers-png-download-transparent-avengers-clipart-png-only-18.png";
        StartCoroutine(GetTexture(uri)); //balanced parens CAS
    }

    public async void Transfer()
    {
        Debug.Log("Calling Transfer");
        // set chain
        string chain = "ethereum";
        // set network
        string network = "goerli";
        // abi in json format
        string abi = "[ { \"inputs\": [ { \"internalType\": \"uint8\", \"name\": \"_myArg\", \"type\": \"uint8\" } ], \"name\": \"addTotal\", \"outputs\": [], \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"inputs\": [], \"name\": \"myTotal\", \"outputs\": [ { \"internalType\": \"uint256\", \"name\": \"\", \"type\": \"uint256\" } ], \"stateMutability\": \"view\", \"type\": \"function\" } ]";
        // address of contract
        string contract = "0x7b5029dBaaDAD0D6d0eB065054B8A331c0C3DF1a";

        // method you want to write to
        string method = "addTotal";
        // amount you want to change, in this case we are adding 1 to "addTotal"
        string amount = "1";
        // array of arguments for contract you can also add a nonce here as optional parameter. You leave this blank or remove and set args to "[]" if your function has no inputs
        // string[] obj = {"_to": recipient, "_value": 1};
        string args = JsonConvert.SerializeObject(amount);
        // connects to user's browser wallet to call a transaction
        string response = await Web3GL.SendContract(method, abi, contract, args, "0", "", "");
        Debug.Log("Got response");
        // Debug.Log(response);
        // string parsed = JsonUtility.FromJson<string>(response);
        // Debug.Log(parsed);

        // // display response in game
        // count.text = parsed;
        print(response);
    }

    public async void GetVal()
    {
        // set chain
        string chain = "ethereum";
        // set network
        string network = "goerli";
        // abi in json format
        string abi = "[ { \"inputs\": [ { \"internalType\": \"uint8\", \"name\": \"_myArg\", \"type\": \"uint8\" } ], \"name\": \"addTotal\", \"outputs\": [], \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"inputs\": [], \"name\": \"myTotal\", \"outputs\": [ { \"internalType\": \"uint256\", \"name\": \"\", \"type\": \"uint256\" } ], \"stateMutability\": \"view\", \"type\": \"function\" } ]";
        // smart contract method, variable or mapping to call
        string method = "myTotal";
        // address of contract
        string contract = "0x7b5029dBaaDAD0D6d0eB065054B8A331c0C3DF1a";
        // array of arguments for contract
        string args = "[]";
        // connects to user's browser wallet to call a transaction
        string response = await EVM.Call(chain, network, contract, abi, method, args);
        // display response in game
        print(response);
        count.text = response;

    }

}
