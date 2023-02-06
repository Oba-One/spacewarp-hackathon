using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Threading.Tasks;

public class CardManager : MonoBehaviour
{
    [SerializeField]
    private GameObject imageObj;
    [SerializeField]
    private GameObject moveButtons;
    private Image image;
    private int slot;
    private string imageUri;

    private GameObject[] locations;

    public string characterId = null;

    public void MoveToLocation(int locationIndex)
    {
        LocationController location = locations[locationIndex-1].GetComponent<LocationController>();
        int zoneIndex = location.GetNextZone();
        Debug.Log("Move to location " + locationIndex.ToString() + ", zone " + zoneIndex.ToString());
        if (zoneIndex > 0)
        {
            Transform zone = location.GetZone(zoneIndex - 1);
            transform.position = zone.position;
            transform.localScale = new Vector3(0.7f, 0.7f, 1.0f);
            location.lastZoneFilled++;
            moveButtons.SetActive(false);
        }
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

    public async Task<string[]> PollMudState()
    {
        Debug.Log("PollMudState");
        string position = await GetPosition();
        string zone = await GetZone();


        return new string[]{};
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
        if (characterId == null)
        {
            Debug.Log("CharacterId not set, cannot retrieve position from MUD.");
            return null;
        }
        else
        {
            Debug.Log("GetPosition " + characterId);
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
            Debug.Log("Got pos response");
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
            Debug.Log("Got zone response");
            print(response);
            return response;
        }
    }
}
