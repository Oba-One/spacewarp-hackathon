using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class GameManager : MonoBehaviour
{
    [SerializeField]
    private Image profileImage;
 
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
            new Rect(0, 0, texture.width, texture.height), Vector2.zero);

            profileImage.sprite = sprite;
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        LoadNewImage();
    }

    public void LoadNewImage()
    {
        string uri = "https://cloudflare-ipfs.com/ipfs/bafybeig42df63mzynufa4fbj3g7e4th2nyjp77iceekgeyqy7j6rabq2xi/marvel-avengers-png-download-transparent-avengers-clipart-png-only-18.png";
        StartCoroutine(GetTexture(uri)); //balanced parens CAS
    }

}
