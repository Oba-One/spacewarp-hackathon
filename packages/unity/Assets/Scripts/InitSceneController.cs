using UnityEngine.SceneManagement;

using UnityEngine;

public class InitSceneController : Singleton<InitSceneController>
{
    // Start is called before the first frame update
    void Start()
    {
        DisableCaptureKeyboard();
        InitChainsafe();
        SceneManager.LoadScene("1 - connect");
    }

    // Update is called once per frame
    void Update()
    {
        
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
