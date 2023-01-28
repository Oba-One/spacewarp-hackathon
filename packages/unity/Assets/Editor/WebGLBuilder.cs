using UnityEngine;
using UnityEditor;

class WebGLBuilder {
    static void build() {

        // Place all your scenes here
        string[] scenes = {"Assets/Scenes/SampleScene.unity"};

        string pathToDeploy = "builds/WebGLversion/";       

        BuildPipeline.BuildPlayer(scenes, pathToDeploy, BuildTarget.WebGL, BuildOptions.None);      
    }
}