import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

/**
 * Game View
 * 1, Will render unity view here and once the game is loaded, remove loader
 */
const Game: React.FC = () => {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      dataUrl: "unity/game.data",
      frameworkUrl: "unity/game.framework.js",
      loaderUrl: "unity/game.loader.js",
      codeUrl: "unity/game.wasm",
      companyName: "MudSnap",
      productName: "MudSnap",
      productVersion: "0.1",
    });

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    sendMessage(
      "MainCamera",
      "ReactToUnityMethod",
      JSON.stringify({
        foo: "bar",
      })
    );
  };

  useEffect(() => {
    const cb = (params: any) => {
      console.log("DemoUnityToReact", params);
    };

    addEventListener("DemoUnityToReact", cb);

    return () => {
      removeEventListener("DemoUnityToReact", cb);
    };
  });

  return (
    <div className="flex flex-col">
      <Unity
        className="unity"
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "90vh" }}
      />
      <button onClick={onBtnClick}>Click</button>
    </div>
  );
};

export default Game;
