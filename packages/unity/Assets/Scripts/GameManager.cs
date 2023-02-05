using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Numerics;

public class GameManager : MonoBehaviour
{
    [SerializeField]
    private GameObject cardPrefab;

    [SerializeField]
    private Canvas canvas;

    // deck
    private List<CardManager> deck;
    private List<CardManager> hand;
    private List<CardManager> field;
    [SerializeField]
    private Transform[] handSlots;
    private Transform[] fieldSlots;

    [SerializeField]
    private Text account;

    void Awake()
    {
        deck = new List<CardManager>();
        hand = new List<CardManager>();
        field = new List<CardManager>();
    }

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine("PollMudState");
    }

    IEnumerator<WaitForSeconds> PollMudState()
    {
        for(;;)
        {
            Debug.Log("PollMudState");
            //yield on a new YieldInstruction that waits for 5 seconds.
            yield return new WaitForSeconds(60);
            // await RefreshFromMud();
        }
    }

    // Update is called once per frame
    void Update()
    {
        account.text = PlayerPrefs.GetString("Account");
    }

    

    void DrawGame(string[] imageCids)
    {
        Debug.Log("CreateGame");
        string ipfsHost = "https://gateway.lighthouse.storage/ipfs";
<<<<<<< HEAD
=======
        List<string> imageCids = new List<string>{
            // chavez
            "QmerXkUqbixUfy47YHusPBVTd2CPDBgpmHVtxiyC9n31NN",
            // antman
            "QmW7q4QxyYC6mFZniU7SqXPivSsijNCt6kWDQWxiWpyDK3",
            // apocalypse
            "Qme9uezkeVaRZ8Qo2N16duFCsmGZjXiXt2tkPH6KZUV3n7",
            // blackbolt
            "QmZRTKS5iBULdk3u1Sm69MVyEaPe1evcnUFfWaYj4cA7av",
            // captain marvel
            "QmYc7CYd2wpiY69PdzWrsZjrUum69GDvzt24YpRFUmhr8U",
            // thanos
            "QmVRKmufiSDogoQh6c1heFbCvUTSgu6xctycTb5jyoCcm1",
            // prof x
            "QmNe4AbGkyyaoKjLdE6jpiyuMjisiPeGAQ2NA7TigW1p5E"


        };
        // create new card from prefab for each image and place in deck
>>>>>>> 83dfb0ec83306c72bc39b41911b99b8a0a94490e

        int handSlotIndex = 0;
        foreach (var imageCid in imageCids)
        {
            Debug.Log("Creating card " + handSlotIndex);
            if (handSlotIndex >= handSlots.Length) {
                Debug.Log("More characters then spaces on the board!!!!!!!!!");
                break;
            }
            UnityEngine.Vector3 cardPosition = handSlots[handSlotIndex++].position;
            GameObject card = Instantiate(cardPrefab, cardPosition, UnityEngine.Quaternion.identity);
            card.transform.SetParent(canvas.transform, false);
            CardManager cardManager = card.GetComponent<CardManager>();
            card.transform.position = cardPosition;
            
            Debug.Log(cardManager);
            
            string cardUri = ipfsHost + "/" + imageCid;
            cardManager.SetImage(cardUri);
            Debug.Log("Created card " + handSlotIndex);
        }
    }

    public async void RefreshFromMud()
    {
        Debug.Log("RefreshFromMud");
        string[] playerCharacters = await GetPlayerCharacters();
        Debug.Log("Got characters for this player, this game");
        foreach (var character in playerCharacters)
        {
            Debug.Log(character);
        }
        
        string[] characterAssets = await GetAssetsForCharacters(playerCharacters);
        Debug.Log("Assets for each character");
        foreach (var asset in characterAssets)
        {
            Debug.Log(asset);
        }
        DrawGame(characterAssets);
    }

    public async Task<string[]> GetAssetsForCharacters(string[] characters)
    {
        Debug.Log("GetAssetsForCharacters");
        string[] assetsForChar = new string[characters.Length];
        for (int i = 0; i < characters.Length; i++)
        {
            string character = characters[i];
            Debug.Log("Character entity: " + character);
            assetsForChar[i] = await GetAssetForCharacter(character);
            Debug.Log("Character asset: " + assetsForChar[i]);
        }

        return assetsForChar;
    }


    public async Task<string[]> GetPlayerCharacters()
    {
        // All characters from all games owned by player
        string playerAddress = PlayerPrefs.GetString("Account");
        string[] entitiesOwnedByPlayer = await GetEntitiesOwnedBy(playerAddress);

        // All characters from all players in game
        string gameHex = PlayerData.gameIdHex();
        string[] entitiesInGame = await GetEntitiesInGame(gameHex);

        // Players in game
        return entitiesOwnedByPlayer.Intersect(entitiesInGame, StringComparer.OrdinalIgnoreCase).ToArray();
    }

    /*
        RPC
    */

    public async Task<string> GetAssetForCharacter(string character)
    {
        Debug.Log("GetAssetForCharacter");
        string abi = Mud.GET_VALUE_ABI;
        // address of contract
        string contract = Mud.ASSET_COMPONENT;
        Debug.Log("Character: " + character);
        BigInteger characterInt = BigInteger.Parse(character);
        string characterHex = "0x" + characterInt.ToString("X64");
        Debug.Log("Hex: " + characterHex);
        string method = "getValue";
        // equivalent to sending empty bytes as arg

        string chain = "mud";
        string network = "mud";
        // array of arguments for contract
        string args = "[\"" + characterHex + "\"]";
        // RPC invocation
        string response = await EVM.Call(chain, network, contract, abi, method, args, Mud.RPC_URI);
        Debug.Log("Got response");
        print(response);
        return response;
    }

    public async Task<string[]> GetEntitiesInGame(string gameId)
    {
        Debug.Log("GetEntitiesInGame");
        string abi = Mud.GET_ENTITIES_WITH_VALUE_ABI;
        // address of contract
        string contract = Mud.INGAME_COMPONENT;
        Debug.Log("Game id: " + gameId);

        string method = "getEntitiesWithValue";
        // equivalent to sending empty bytes as arg

        string chain = "mud";
        string network = "mud";
        // array of arguments for contract
        string args = "[\"" + gameId + "\"]";
        // RPC invocation
        string response = await EVM.Call(chain, network, contract, abi, method, args, Mud.RPC_URI);
        Debug.Log("Got response");
        print(response);
        return Mud.AdaptMudResp2StringArr(response);
    }

    public async Task<string[]> GetEntitiesOwnedBy(string playerAddress)
    {
        Debug.Log("GetEntitiesOwnedBy");
        string abi = Mud.GET_ENTITIES_WITH_VALUE_ABI;

        // address of contract
        string contract = Mud.OWNEDBY_COMPONENT;
        Debug.Log("Player address: " + playerAddress);
        // method you want to write to

        string method = "getEntitiesWithValue";
        // equivalent to sending empty bytes as arg

        string chain = "mud";
        string network = "mud";
        // array of arguments for contract
        string args = "[\"" + playerAddress + "\"]";
        // RPC invocation
        string response = await EVM.Call(chain, network, contract, abi, method, args, Mud.RPC_URI);
        Debug.Log("Got response");
        print(response);
        return Mud.AdaptMudResp2StringArr(response);
    }
}
