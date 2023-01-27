import { SWRConfig } from "swr";
import { useState } from "react";
import { getDefaultProvider } from "ethers";
import { WagmiConfig, createClient } from "wagmi";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Game from "./views/Game";

import { Nav } from "./components/Nav";
import { Loader } from "./components/Loader";

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
});

const Views = () => {
  return (
    <Routes>
      <Route index element={<Game />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [error, setError] = useState("");

  function handleReload() {
    setStatus("loading");
    window.location.reload();
    setError("");
  }

  return (
    <WagmiConfig client={client}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
        }}
      >
        <BrowserRouter>
          {(status === "loading" || status === "error") && (
            <Loader error={error} reload={handleReload} />
          )}
          <Nav />
          <Views />
        </BrowserRouter>
      </SWRConfig>
    </WagmiConfig>
  );
}

export default App;
