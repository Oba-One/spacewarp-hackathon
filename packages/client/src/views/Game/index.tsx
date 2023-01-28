import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

/**
 * Game View
 * 1, Will render unity view here and once the game is loaded, remove loader
 */
const Game: React.FC = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "unity/builds.loader.js",
    dataUrl: "unity/builds.data",
    frameworkUrl: "unity/builds.framework.js",
    codeUrl: "unity/builds.wasm",
  });

  return (
    <Unity
      className="unity"
      unityProvider={unityProvider}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Game;
