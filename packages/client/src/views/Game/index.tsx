import { LivepeerConfig } from "@livepeer/react";
import React, { useState, useEffect } from "react";
import { useRootStore } from "@huddle01/huddle01-client";
import { Unity, useUnityContext } from "react-unity-webgl";

import { livepeerClient } from "../../modules/clients";
import { Player } from "../../components/Player";
import { Loader } from "../../components/Loader";

const Game: React.FC = () => {
  const [code, setCode] = useState(7);
  const [status, setStatus] = useState<"pre-match" | "match" | "post-match">();
  const [result, seResult] = useState<GameResult>({
    winner: "",
    loser: "",
    locationsWon: 0,
    teams: [],
  });

  const peerId = useRootStore((state) =>
    state.peers.length ? state.peers[0].peerId : ""
  );

  const {
    isLoaded,
    unityProvider,
    takeScreenshot,
    loadingProgression,
    addEventListener,
    removeEventListener,
    initialisationError,
  } = useUnityContext({
    dataUrl: "unity/game.data",
    frameworkUrl: "unity/game.framework.js",
    loaderUrl: "unity/game.loader.js",
    codeUrl: "unity/game.wasm",
    companyName: "MudSnap",
    productName: "MudSnap",
    productVersion: "0.1",
  });

  initialisationError && console.error("Error With Unity", initialisationError);
  const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    function onGameStarted() {
      setStatus("match");
    }
    function onGameEnded() {
      const screenshot = takeScreenshot();

      setStatus("post-match");

      seResult({
        ...result,
        screenshot,
      });
    }
    function onGameCode(gameCode: number) {
      setCode(gameCode);
    }

    addEventListener("GameStarted", onGameStarted);
    addEventListener("GameEnded", onGameEnded);
    addEventListener("GameCode", onGameCode);

    return () => {
      removeEventListener("GameStarted", onGameStarted);
      removeEventListener("GameEnded", onGameEnded);
      removeEventListener("GameCode", onGameCode);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivepeerConfig client={livepeerClient}>
      {!isLoaded && <Loader precents={loadingPercentage} />}
      {status === "post-match" ? (
        <section className="flex h-screen w-screen items-center justify-center bg-amber-700"></section>
      ) : (
        <>
          <section
            id="react"
            className="z-1 fixed flex h-screen w-screen justify-between"
          >
            <Player
              type="opponent"
              peerId={peerId}
              gameCode={code}
              setGameCode={setCode}
            />
            <Player
              type="player"
              peerId={peerId}
              gameCode={code}
              setGameCode={setCode}
              opponentId={peerId}
            />
          </section>
          <section
            id="unity"
            className="flex grid h-screen w-screen place-items-center"
          >
            <Unity
              className="h-screen w-screen"
              unityProvider={unityProvider}
            />
          </section>
        </>
      )}
    </LivepeerConfig>
  );
};

export default Game;
