import React, { useState } from "react";
import { LivepeerConfig } from "@livepeer/react";
import { useRootStore } from "@huddle01/huddle01-client";
import { Unity, useUnityContext } from "react-unity-webgl";

import { livepeerClient } from "../../modules/clients";
import { Player } from "../../components/Player";

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
    companyName: "MudSnap",
    productName: "MudSnap",
    productVersion: "0.1",
  });

  const [gameCode, setGameCode] = useState(1);

  const peerId = useRootStore((state) =>
    state.peers.length ? state.peers[0].peerId : ""
  );

  return (
    <LivepeerConfig client={livepeerClient}>
      <section
        id="react"
        className="fixed z-10 flex h-screen w-screen justify-between"
      >
        <Player
          type="opponent"
          peerId={peerId}
          gameCode={gameCode}
          setGameCode={setGameCode}
        />
        <Player
          type="player"
          peerId={peerId}
          gameCode={gameCode}
          setGameCode={setGameCode}
          opponentId={peerId}
        />
      </section>
      <section
        id="unity"
        className="flex grid h-screen w-screen place-items-center"
      >
        <Unity className="h-screen w-screen" unityProvider={unityProvider} />
      </section>
    </LivepeerConfig>
  );
};

export default Game;
