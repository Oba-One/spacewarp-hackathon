import { SWRConfig } from "swr";
import { useState } from "react";
import { WagmiConfig } from "wagmi";
import { LivepeerConfig } from "@livepeer/react";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Game from "./views/Game";

import { Nav } from "./components/Nav";
import { Loader } from "./components/Loader";
import { huddleClient, livepeerClient, wagmiClient } from "modules/clients";

const Views = () => {
  return (
    <Routes>
      <Route index element={<Game />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("done");
  const [error, setError] = useState("");

  function handleReload() {
    setStatus("loading");
    window.location.reload();
    setError("");
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
        }}
      >
          <HuddleClientProvider value={huddleClient}>
            <BrowserRouter>
              {(status === "loading" || status === "error") && (
                <Loader error={error} reload={handleReload} />
              )}
              <Nav />
              <Views />
            </BrowserRouter>
          </HuddleClientProvider>
      </SWRConfig>
    </WagmiConfig>
  );
}

export default App;
