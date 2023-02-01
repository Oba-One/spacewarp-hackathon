using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using System.Runtime.InteropServices; // for DllImport

public class HandleClick : MonoBehaviour
{
    // React functions
    [DllImport("__Internal")]
    private static extern void DemoUnityToReact (string jsonifyStr); // This function is the one in MyPlugin.jslib


    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            leftClickDown();
        }
    }

    void leftClickDown()
    {
        Debug.Log("Left click");

        if (Application.platform == RuntimePlatform.WebGLPlayer) {
            SendMessage bus = new SendMessage();
            bus.message = "Hello from Unity";
            bus.secondField = 123;
            string busStr = JsonUtility.ToJson(bus);
            DemoUnityToReact(busStr);
        }
    }
}