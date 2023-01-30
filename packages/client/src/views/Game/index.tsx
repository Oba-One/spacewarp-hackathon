import React, { useEffect } from "react";
import { LivepeerConfig } from "@livepeer/react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { livepeerClient } from "modules/clients";
import { Player } from "components/Game/Player";
import { useRootStore } from "@huddle01/huddle01-client/*";

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

  const peerId = useRootStore((state) => state.peers[0].peerId);

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
    <LivepeerConfig client={livepeerClient}>
      <Unity
        className="unity"
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "90vh" }}
      />
      <section id="react" className="fixed inset-0 w-screen h-screen">
        <Player type="opponent" peerId={peerId} gameId="" />
        <Player type="player" peerId={peerId} gameId="" />
        {/* <button onClick={onBtnClick}>Click</button> */}
      </section>
    </LivepeerConfig>
  );
};

export default Game;
