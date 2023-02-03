import { SWRConfig } from "swr";
import { WagmiConfig } from "wagmi";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Game from "./views/Game";
import Team from "./views/Team";

import { huddleClient, wagmiClient } from "./modules/clients";

const Views = () => {
  return (
    <Routes>
      <Route index element={<Game />} />
      <Route path="/team" element={<Team />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
        }}
      >
        <HuddleClientProvider value={huddleClient}>
          <BrowserRouter>
            <Views />
          </BrowserRouter>
        </HuddleClientProvider>
      </SWRConfig>
    </WagmiConfig>
  );
}

export default App;
