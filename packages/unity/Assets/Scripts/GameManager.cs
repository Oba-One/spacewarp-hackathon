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
    [SerializeField]
    private Transform[] fieldSlots;

    [SerializeField]
    private Text account;

    [SerializeField]
    private Text joinCode;

    [SerializeField]
    private Text numerator;

    private int POLL_INTERVAL_MS = 1500;
    private bool firstLoad = true;

    void Awake()
    {
        deck = new List<CardManager>();
        hand = new List<CardManager>();
        field = new List<CardManager>();
    }

    // Start is called before the first frame update
    void Start()
    {
    }

    // public async Task<int> PollMudState()
    // {
    //     if (shouldPoll)
    //     {
    //         Debug.Log("PollMudState");
    //         shouldPoll = false;
    //         string gameHex = PlayerData.gameIdHex();
    //         string matchState = await GetMatchState(gameHex);
    //         Debug.Log("Got match state");
    //         Debug.Log(matchState);

    //         await Task.Delay(POLL_INTERVAL_MS);
    //         shouldPoll = true;
    //         return 1;
    //     }
    //     return 0;
    // }

    // Update is called once per frame
    void Update()
    {
        account.text = PlayerData.teamName() + " " + PlayerPrefs.GetString("Account");
        joinCode.text = "Join code:  " + PlayerData.gameId.ToString();
        // await PollMudState();
    }

    void DrawHand(string[] imageCids)
    {
        Debug.Log("CreateGame");
        string ipfsHost = "https://gateway.lighthouse.storage/ipfs";

        int handSlotIndex = 0;
        foreach (var imageCid in imageCids)
        {
            Debug.Log("Creating card " + handSlotIndex);
            if (handSlotIndex >= handSlots.Length)
            {
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
        if (firstLoad)
        {
            firstLoad = false;
            Debug.Log("Will draw characters for the first time");
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
            DrawHand(characterAssets);
        }
        else
        {
            Debug.Log("Will not redraw characters");
        }

        string gameHex = PlayerData.gameIdHex();
        string[] matchState = await GetMatchState(gameHex);
        Debug.Log("Got match state");
        Debug.Log(matchState);
        string turnsLeft = matchState[2];
        int turnNum = 6 - int.Parse(turnsLeft);
        numerator.text = turnNum.ToString();
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
    public async Task<string[]> GetMatchState(string gameId)
    {
        Debug.Log("GetMatchState");
        string abi = Mud.GET_MATCH_VALUE_ABI;
        // address of contract
        string contract = Mud.MATCH_COMPONENT;
        Debug.Log("Game id: " + gameId);

        string method = "getValue";
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

    public async Task<string> GetAssetForCharacter(string character)
    {
        Debug.Log("GetAssetForCharacter");
        string abi = Mud.GET_STRING_VALUE_ABI;
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
