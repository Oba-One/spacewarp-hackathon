using System;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

#if UNITY_WEBGL
public class ConnectSceneController : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void Web3Connect();

    [DllImport("__Internal")]
    private static extern string ConnectAccount();

    [DllImport("__Internal")]
    private static extern void SetConnectAccount(string value);

    private int expirationTime;
    private string account; 

    void Start()
    {
        DisableCaptureKeyboard();
        InitChainsafe();
    }

    public void OnLogin()
    {
        Web3Connect();
        OnConnected(1);
    }

    async private void OnConnected(int sceneIndex)
    {
        account = ConnectAccount();
        while (account == "") {
            await new WaitForSeconds(1f);
            account = ConnectAccount();
        };
        // save account for next scene
        PlayerPrefs.SetString("Account", account);
        // reset login message
        SetConnectAccount("");
        // load next scene
        SceneManager.LoadScene(sceneIndex);
        // SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    public void OnSkip()
    {
        // burner account for skipped sign in screen
        PlayerPrefs.SetString("Account", "");
        // move to next scene
        SceneManager.LoadScene(1);
    }

    private void DisableCaptureKeyboard()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        // disable WebGLInput.captureAllKeyboardInput so elements in web page can handle keyboard inputs
        WebGLInput.captureAllKeyboardInput = false;
#endif
    }

    private void InitChainsafe()
    {
        PlayerPrefs.SetString("ProjectID", "0c73c25c-9982-4b08-892a-cab282ed0773");
        PlayerPrefs.SetString("ChainID", "4242");
        PlayerPrefs.SetString("Chain", "MUD Testnet");
        PlayerPrefs.SetString("Network", "Testnet");
        PlayerPrefs.SetString("RPC", "https://follower.testnet-chain.linfra.xyz");

        // PlayerPrefs.SetString("ChainID", "1337");
        // PlayerPrefs.SetString("Chain", "MUD Dev");
        // PlayerPrefs.SetString("Network", "Dev");
        // PlayerPrefs.SetString("RPC", "http://localhost:8545");
    }
}
#endif
