using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Threading.Tasks;
using System;
using System.Runtime.InteropServices;
using Newtonsoft.Json;

public class CardManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GameEnded();

    [SerializeField]
    private GameObject imageObj;
    [SerializeField]
    private GameObject moveButtons;
    private Image image;
    private int slot;
    private string imageUri;

    private GameObject[] locations;

    public string characterId = null;
    public bool belongsToOpponent = false;

    public async void MoveToLocation(int locationIndex)
    {
        LocationController location = locations[locationIndex-1].GetComponent<LocationController>();
        int zoneIndex = location.GetNextZone();
        Debug.Log("Move to location " + locationIndex.ToString() + ", zone " + zoneIndex.ToString());
        if (zoneIndex > 0)
        {
            await MudMoveCharacter(locationIndex, zoneIndex);
            Debug.Log("Done moving location on chain");
            Transform zone = location.GetZone(zoneIndex - 1);
            // gameObject.GetComponent<MeshRenderer>().enabled = true;
            transform.position = zone.position;
            transform.localScale = new Vector3(0.7f, 0.7f, 1.0f);
            location.lastZoneFilled++;
            if (location.lastZoneFilled >= 4)
            {
                if (Application.platform == RuntimePlatform.WebGLPlayer) {
                    GameEnded();
                }
            }
            moveButtons.SetActive(false);
        }
    }

    public async Task<int> WasMovedToLocation(int locationIndex, int zoneIndex)
    {
        Debug.Log("WasMovedToLocation " + locationIndex.ToString() + ", zone " + zoneIndex.ToString());
        if (belongsToOpponent)
        {
            LocationController location = locations[locationIndex-1].GetComponent<LocationController>();
            Debug.Log("Was moved to to location " + locationIndex.ToString() + ", zone " + zoneIndex.ToString());
            if (zoneIndex > 0 && locationIndex > 0 && zoneIndex < 5)
            {
                Transform zone = location.GetOpponentZone(zoneIndex - 1);
                transform.position = zone.position;
                transform.localScale = new Vector3(0.7f, 0.7f, 1.0f);
                location.lastOpponentZoneFilled++;
                if (location.lastOpponentZoneFilled >= 4)
                {
                    if (Application.platform == RuntimePlatform.WebGLPlayer) {
                        GameEnded();
                    }
                }
                moveButtons.SetActive(false);
            }
        }

        return 1;
    }

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

            image.sprite = sprite;
            Debug.Log("Successfullly loaded image from " + imageUri);
        }
    }

    void Awake()
    {
        slot = -1;
    }

    // Start is called before the first frame update
    void Start()
    {
        image = imageObj.transform.GetComponent<Image>();
        locations = new GameObject[]{
            GameObject.Find("L1"),
            GameObject.Find("L2"),
            GameObject.Find("L3")
        };
        StartCoroutine(ContinuouslyPollMudState());
    }


    IEnumerator<object> ContinuouslyPollMudState() {
        Debug.Log("CardManager#ContinuouslyPollMudState");
        for(;;)
        {
            Debug.Log("WaitForOurTask");
            Task task = PollMudState();
            yield return new WaitUntil(() => task.IsCompleted);
            yield return new WaitForSeconds(Mud.POLL_INTERVAL_SECS);
        }
    }

    public async Task<int[]> PollMudState()
    {
        Debug.Log("PollMudState");
        string position = await GetPosition();
        string zone = await GetZone();
        int[] newState = new int[]{
            int.Parse(position)-1,
            int.Parse(zone)+1
        };
        
        await WasMovedToLocation(newState[0], newState[1]);
        return newState;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SetImage(string newImageUri)
    {
        Debug.Log("SetImage " + newImageUri);
        imageUri = newImageUri;
        StartCoroutine(GetTexture(imageUri));
    }

    void MoveFromDeck2Hand(Vector3 position)
    {
        transform.position = position;
    }

    /*
        RPC
    */
    public async Task<string> GetPosition()
    {
        if (string.IsNullOrEmpty(characterId))
        {
            Debug.Log("CharacterId not set, cannot retrieve position from MUD.");
            return null;
        }
        else
        {
            Debug.Log("GetPosition " + characterId == "");
            string abi = Mud.GET_ENUM_VALUE_ABI;
            // address of contract
            string contract = Mud.POSITION_COMPONENT;

            string method = "getValueTyped";
            // equivalent to sending empty bytes as arg

            string chain = "mud";
            string network = "mud";
            // array of arguments for contract
            string args = "[\"" + characterId + "\"]";
            // RPC invocation
            string response = await EVM.Call(chain, network, contract, abi, method, args, Mud.RPC_URI);
            Debug.Log("Got pos response for " + characterId);
            print(response);
            return response;
        }
    }

    public async Task<string> GetZone()
    {
        if (characterId == null)
        {
            Debug.Log("CharacterId not set, cannot retrieve zone from MUD.");
            return null;
        }
        else
        {
            Debug.Log("GetZone " + characterId);
            string abi = Mud.GET_ENUM_VALUE_ABI;
            string contract = Mud.ZONE_COMPONENT;
            string method = "getValueTyped";
            string chain = "mud";
            string network = "mud";

            // array of arguments for contract
            string args = "[\"" + characterId + "\"]";

            // RPC invocation
            string response = await EVM.Call(chain, network, contract, abi, method, args, Mud.RPC_URI);
            if (response.CompareTo("4") != 0)
            {
                Debug.Log("Got zone response for " + characterId);
                print(response);
            }

            return response;
        }
    }

    public async Task<string> MudMoveCharacter(int location, int zone)
    {
        Debug.Log("Calling MudMoveCharacter");
        string abi = Mud.MOVE_CHARACTER_SYSTEM_ABI;
        string contract = Mud.MOVE_CHARACTER_SYSTEM;
        string method = "executeTyped";
        // equivalent to sending empty bytes as arg
        string locationHex = "0x" + location.ToString("X64");
        Debug.Log("location hex: " + locationHex);

        string zoneHex = "0x" + zone.ToString("X64");
        Debug.Log("zone hex: " + zoneHex);

        string[] args = {characterId, locationHex, zoneHex };
        string argsSerialized = JsonConvert.SerializeObject(args);

        // connects to user's browser wallet to call a transaction
        string response = await Web3GL.SendContract(method, abi, contract, argsSerialized, "0", "", "");
        Debug.Log("Got response");
        print(response);
        return response;
    }
}
