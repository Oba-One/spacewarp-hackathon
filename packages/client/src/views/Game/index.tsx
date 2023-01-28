import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

/**
 * Game View
 * 1, Will render unity view here and once the game is loaded, remove loader
 */
const Game: React.FC = () => {
  const { unityProvider } = useUnityContext({
    dataUrl: "unity/game.data",
    frameworkUrl: "unity/game.framework.js",
    loaderUrl: "unity/game.loader.js",
    codeUrl: "unity/game.wasm",
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
