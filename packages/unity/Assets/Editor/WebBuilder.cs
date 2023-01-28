using UnityEngine;
using UnityEditor;

class WebBuilder {
    static void build() {

        // Place all your scenes here
        string[] scenes = {"Assets/Scenes/SampleScene.unity"};

        string pathToDeploy = "builds/web/";       

        BuildPipeline.BuildPlayer(scenes, pathToDeploy, BuildTarget.WebGL, BuildOptions.None);      
    }
}