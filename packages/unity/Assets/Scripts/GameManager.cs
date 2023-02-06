using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Numerics;
using System.Runtime.InteropServices;

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
    private int handSlotsFilled = 0;
    [SerializeField]
    private Transform[] handSlots;
    [SerializeField]
    private Transform[] fieldSlots;

    [SerializeField]
    private Text account;

    [SerializeField]
    private Text joinCode;

    [SerializeField]
    private GameObject opponentBox;

    [SerializeField]
    private Text opponentAddress;

    [SerializeField]
    private Text numerator;

    [DllImport("__Internal")]
    private static extern void GameStarted();


    private bool firstLoad = true;
    private bool opponentLoaded = false;

    private bool isOpponentPresent = false;

    void Awake()
    {
        deck = new List<CardManager>();
        hand = new List<CardManager>();
        field = new List<CardManager>();
    }

    // Start is called before the first frame update
    void Start()
    {
        SeedDebugData();
        StartCoroutine(ContinuouslyPollMudState());
    }

    void SeedDebugData()
    {
        // DrawHand(new string[]{
        //     "QmVRKmufiSDogoQh6c1heFbCvUTSgu6xctycTb5jyoCcm1",
        //     "QmYc7CYd2wpiY69PdzWrsZjrUum69GDvzt24YpRFUmhr8U",
        //     "QmZRTKS5iBULdk3u1Sm69MVyEaPe1evcnUFfWaYj4cA7av",
        //     "Qme9uezkeVaRZ8Qo2N16duFCsmGZjXiXt2tkPH6KZUV3n7",
        //     "QmNe4AbGkyyaoKjLdE6jpiyuMjisiPeGAQ2NA7TigW1p5E",
        //     "QmW7q4QxyYC6mFZniU7SqXPivSsijNCt6kWDQWxiWpyDK3",
        //     "QmerXkUqbixUfy47YHusPBVTd2CPDBgpmHVtxiyC9n31NN"
        //     });
    }

    IEnumerator<object> ContinuouslyPollMudState() {
        Debug.Log("ContinuouslyPollMudState");
        for(;;)
        {
            Debug.Log("WaitForOurTask");
            Task task = RefreshFromMud();
            yield return new WaitUntil(() => task.IsCompleted);
            yield return new WaitForSeconds(Mud.POLL_INTERVAL_SECS);
        }
    }

    // public async Task<string[]> PollMudState()
    // {
    //     Debug.Log("PollMudState");
    //     string gameHex = PlayerData.gameIdHex();
    //     string[] matchState = await GetMatchState(gameHex);
    //     Debug.Log("Got match state");
    //     foreach (var s in matchState)
    //     {
    //         Debug.Log(s);
    //     }    
    //     int matchStartedAt = int.Parse(matchState[0]);
    //     Debug.Log(matchStartedAt.ToString());

    //     if (matchStartedAt > 0) {
    //         Debug.Log("Opponent detected");
    //         isOpponentPresent = true;
    //     }

    //     return new string[]{};
    // }

    // Update is called once per frame
    void Update()
    {
        account.text = PlayerData.teamName() + " - " + PlayerPrefs.GetString("Account");
        joinCode.text = "Join code:  " + PlayerData.gameId.ToString();
        // await PollMudState();
    }

    // void DrawHand(string[] imageCids)
    // {
    //     Debug.Log("CreateGame");
    //     string ipfsHost = "https://gateway.lighthouse.storage/ipfs";

    //     int handSlotIndex = 0;
    //     foreach (var imageCid in imageCids)
    //     {
    //         Debug.Log("Creating card " + handSlotIndex);
    //         if (handSlotIndex >= handSlots.Length)
    //         {
    //             Debug.Log("More characters then spaces on the board!!!!!!!!!");
    //             break;
    //         }
    //         UnityEngine.Vector3 cardPosition = handSlots[handSlotIndex++].position;
    //         GameObject card = Instantiate(cardPrefab, cardPosition, UnityEngine.Quaternion.identity);
    //         card.transform.SetParent(canvas.transform, false);
    //         CardManager cardManager = card.GetComponent<CardManager>();
    //         card.transform.position = cardPosition;

    //         Debug.Log(cardManager);

    //         string cardUri = ipfsHost + "/" + imageCid;
    //         cardManager.SetImage(cardUri);
    //         Debug.Log("Created card " + handSlotIndex);
    //     }
    // }

    void AddToHand(string characterId, string imageCid)
    {
        Debug.Log("CreateGame");
        string ipfsHost = "https://gateway.lighthouse.storage/ipfs";

        Debug.Log("Creating card " + handSlotsFilled + 1);
        if (handSlotsFilled >= handSlots.Length)
        {
            // TODO. keep track of characters already added
            Debug.Log("More characters then spaces on the board!!!!!!!!!");
            return;
        }

        UnityEngine.Vector3 cardPosition = handSlots[handSlotsFilled++].position;
        GameObject card = Instantiate(cardPrefab, cardPosition, UnityEngine.Quaternion.identity);
        card.transform.SetParent(canvas.transform, false);
        CardManager cardManager = card.GetComponent<CardManager>();
        card.transform.position = cardPosition;
        cardManager.characterId = characterId;

        Debug.Log(cardManager);

        string cardUri = ipfsHost + "/" + imageCid;
        cardManager.SetImage(cardUri);
        Debug.Log("Created card " + handSlotsFilled + 1);
    }

    // void AddToOpponentHand(string characterId, string imageCid)
    // {
    //     Debug.Log("CreateGame");
    //     string ipfsHost = "https://gateway.lighthouse.storage/ipfs";

    //     Debug.Log("Creating card " + handSlotsFilled + 1);
    //     if (handSlotsFilled >= handSlots.Length)
    //     {
    //         // TODO. keep track of characters already added
    //         Debug.Log("More characters then spaces on the board!!!!!!!!!");
    //         return;
    //     }

    //     UnityEngine.Vector3 cardPosition = handSlots[handSlotsFilled++].position;
    //     GameObject card = Instantiate(cardPrefab, cardPosition, UnityEngine.Quaternion.identity);
    //     card.transform.SetParent(canvas.transform, false);
    //     CardManager cardManager = card.GetComponent<CardManager>();
    //     card.transform.position = cardPosition;
    //     cardManager.characterId = characterId;

    //     Debug.Log(cardManager);

    //     string cardUri = ipfsHost + "/" + imageCid;
    //     cardManager.SetImage(cardUri);
    //     Debug.Log("Created card " + handSlotsFilled + 1);
    // }

    public async Task<int> RefreshFromMud()
    {
        Debug.Log("RefreshFromMud");
        if (firstLoad)
        {
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
                firstLoad = false;
                Debug.Log(asset);
            }
            // DrawHand(characterAssets);
        }
        else
        {
            Debug.Log("Will not redraw characters");
        }

        string gameHex = PlayerData.gameIdHex();
        string[] matchState = await GetMatchState(gameHex);
        Debug.Log("Got match state");    
        int matchStartedAt = int.Parse(matchState[0]);
        Debug.Log(matchStartedAt.ToString());

        if (matchStartedAt > 0) {
            Debug.Log("Opponent detected");
            isOpponentPresent = true;
        }
        string turnsLeft = matchState[2];
        int turnNum = 6 - int.Parse(turnsLeft);
        numerator.text = turnNum.ToString();

        if (!opponentLoaded && isOpponentPresent)
        {
            Debug.Log("Will draw opponent for the first time");
            string[] opponentCharacters = await GetOpponentCharacters();
            Debug.Log("Got oponent for this player, this game");
            foreach (var character in opponentCharacters)
            {
                Debug.Log(character);
            }
            opponentLoaded = true;

            // string[] characterAssets = await GetAssetsForCharacters(playerCharacters);
            // Debug.Log("Assets for each character");
            // foreach (var asset in characterAssets)
            // {
            //     Debug.Log(asset);
            // }
        }
        return 0;
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
            AddToHand(character, assetsForChar[i]);
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

    public async Task<string[]> GetOpponentCharacters()
    {
        string gameHex = PlayerData.gameIdHex();

        // Get the opponent's key
        // Get all players in game, filter out self
        string playerAddress = PlayerPrefs.GetString("Account");
        string[] playersOwnedByGame = await GetEntitiesOwnedBy(gameHex);
        string[] playerAddressArr = {playerAddress};
        string[] opponents = playersOwnedByGame.Except(playerAddressArr, StringComparer.OrdinalIgnoreCase).ToArray();
        Debug.Log("Got opponents");
        Debug.Log(opponents);
        string opponent = opponents[0];
        PlayerData.opponentId = opponent;
        BigInteger opponentInt = BigInteger.Parse(opponent);
        string opponentHex = "Against: 0x" + opponentInt.ToString("X64");
        opponentAddress.text = opponentHex;
        opponentBox.SetActive(true);
        if (Application.platform == RuntimePlatform.WebGLPlayer) {
            GameStarted();
        }

        // All characters from all games owned by player
        string[] entitiesOwnedByOpponent = await GetEntitiesOwnedBy(opponent);

        // All characters from all players in game
        string[] entitiesInGame = await GetEntitiesInGame(gameHex);

        // Players in game
        return entitiesOwnedByOpponent.Intersect(entitiesInGame, StringComparer.OrdinalIgnoreCase).ToArray();
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
