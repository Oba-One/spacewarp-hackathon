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
      <div className="container">
        <div className="grid grid-cols-5">
          <div>
            <Player
              type="opponent"
              peerId={peerId}
              gameCode={gameCode}
              setGameCode={setGameCode}
            />
          </div>

          <div className="col-span-3">
            <Unity className="w-full" unityProvider={unityProvider} />
          </div>

          <div>
            <Player
              type="player"
              peerId={peerId}
              gameCode={gameCode}
              setGameCode={setGameCode}
              opponentId={peerId}
            />
          </div>
        </div>
      </div>
        

        
    </LivepeerConfig>
  );
};

export default Game;

