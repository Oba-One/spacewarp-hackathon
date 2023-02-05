using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

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
}
