using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class CardManager : MonoBehaviour
{
    private Image image;
    private int slot;
    private string imageUri;

    IEnumerator GetTexture(string url) {
        image = transform.GetComponent<Image>();
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
