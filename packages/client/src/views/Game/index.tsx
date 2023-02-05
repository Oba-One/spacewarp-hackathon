import { LivepeerConfig } from "@livepeer/react";
import React, { useState, useEffect } from "react";
import { useRootStore } from "@huddle01/huddle01-client";
import { Unity, useUnityContext } from "react-unity-webgl";

import { livepeerClient } from "../../modules/clients";
import { useLeague } from "../../hooks/useLeague";
import { Player } from "../../components/Player";
// import { Loader } from "../../components/Loader";

const teamEnums = {
  water: 1,
  earth: 2,
  fire: 3,
  air: 4,
};

const Game: React.FC = () => {
  const [code, setCode] = useState(7);
  // const [status, setStatus] = useState<"pre-match" | "match" | "post-match">();
  const [result, seResult] = useState<GameResult>({
    winner: "",
    loser: "",
    locationsWon: 0,
    teams: [],
  });

  const peerId = useRootStore((state) =>
    state.peers.length ? state.peers[0].peerId : ""
  );

  const { isMember, squadId, squadMap } = useLeague();

  const {
    sendMessage,
    unityProvider,
    takeScreenshot,
    addEventListener,
    removeEventListener,
    initialisationError,
  } = useUnityContext({
    dataUrl: "unity/game.data",
    frameworkUrl: "unity/game.framework.js",
    loaderUrl: "unity/game.loader.js",
    codeUrl: "unity/game.wasm",
    companyName: "DAOSmack",
    productName: "DAOSmack",
    productVersion: "0.1",
  });

  initialisationError && console.error("Error With Unity", initialisationError);
  // const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    if (isMember && squadId) {
      const squad = squadMap[squadId];

      sendMessage("TeamSceneManager", "SetTeam", teamEnums[squad.element]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMember, squadId]);

  useEffect(() => {
    function onGameStarted() {
      // setStatus("match");
    }
    function onGameEnded() {
      const screenshot = takeScreenshot();

      // setStatus("post-match");

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
      <div className="container">
        <div className="grid grid-cols-5">
          <div>
            <Player
              type="opponent"
              peerId={peerId}
              gameCode={code}
              setGameCode={setCode}
            />
          </div>

          <div className="col-span-3">
            <Unity className="w-full" unityProvider={unityProvider} />
          </div>

          <div>
            <Player
              type="player"
              peerId={peerId}
              gameCode={code}
              setGameCode={setCode}
              opponentId={peerId}
            />
          </div>
        </div>
      </div>
    </LivepeerConfig>
  );
};

export default Game;
