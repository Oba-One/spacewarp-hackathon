using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;



#if UNITY_WEBGL
public class ConnectSceneController : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void Web3Connect();

    [DllImport("__Internal")]
    private static extern string ConnectAccount();

    [DllImport("__Internal")]
    private static extern void SetConnectAccount(string value);

    [SerializeField]
    private Text teamName;

    private int expirationTime;
    private string account;

    public void Start()
    {
        teamName.text = "Squad: " + PlayerData.teamName();
    }

    public void OnLogin()
    {
        Web3Connect();
        OnConnected("2 - select");
    }

    async private void OnConnected(string sceneName)
    {
        account = ConnectAccount();
        while (account == "") {
            await new WaitForSeconds(1f);
            account = ConnectAccount();
        };
        // save account for next scene
        PlayerPrefs.SetString("Account", account);
        Debug.Log("Logged in as " + account);
        // reset login message
        SetConnectAccount("");
        // load next scene
        SceneManager.LoadScene(sceneName);
    }

    public void OnSkip()
    {
        // burner account for skipped sign in screen
        PlayerPrefs.SetString("Account", "");
        // move to next scene
        SceneManager.LoadScene("2 - select");
    }
}
#endif
