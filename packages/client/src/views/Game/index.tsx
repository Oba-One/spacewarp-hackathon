import { LivepeerConfig } from "@livepeer/react";
import React, { useState, useEffect } from "react";
import { useRootStore } from "@huddle01/huddle01-client";
import { Unity, useUnityContext } from "react-unity-webgl";

import { livepeerClient } from "../../modules/clients";
import { Player } from "../../components/Player";
// import { Loader } from "../../components/Loader";

interface GameProps {
  isMember?: boolean;
  squadId: `0x${string}`;
  squadMap: Record<string, Squad>;
}

const teamEnums = {
  water: 1,
  earth: 2,
  fire: 3,
  air: 4,
};

const Game: React.FC<GameProps> = ({ isMember, squadId, squadMap }) => {
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
    } else {
      sendMessage("TeamSceneManager", "SetTeam", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMember, squadId]);

  useEffect(() => {
    function onGameStarted() {
      console.log(`onGameStarted`);
      // setStatus("match");
    }
    function onGameEnded() {
      console.log(`onGameEnded`);
      const screenshot = takeScreenshot();

      // setStatus("post-match");

      seResult({
        ...result,
        screenshot,
      });
    }
    function onGameCode(gameCode: number) {
      console.log(`onGameCode: ${gameCode}`);
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
      <section className="container h-screen w-screen">
        {/* <Player
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
        /> */}
        <Unity
          className="mt-20 h-screen w-screen "
          unityProvider={unityProvider}
        />
        {/* <button className="btn" onClick={handleWaterSelected}>
          Water
        </button> */}
      </section>
    </LivepeerConfig>
  );
};

export default Game;
