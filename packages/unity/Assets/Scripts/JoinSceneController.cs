using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class JoinSceneController : MonoBehaviour
{
    [SerializeField]
    private Text joinCode;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void Join()
    {
        // PlayerData.gameId = joinCode.GetComponent<Text>().text;
        Debug.Log("Setting game ID to " + PlayerData.gameId);
        SceneManager.LoadScene("4 - play");
    }
}
