import { SWRConfig } from "swr";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Game from "./views/Game";
import Squad from "./views/Squad";

import { Nav } from "./components/Nav";
import { useLeague } from "./hooks/useLeague";
import { huddleClient, wagmiClient } from "./modules/clients";

const Views = () => {
  const { squadId, squadMap, isMember, join } = useLeague();

  return (
    <Routes>
      <Route
        index
        element={
          <Game squadId={squadId} squadMap={squadMap} isMember={isMember} />
        }
      />
      <Route
        path="/squad"
        element={<Squad squadId={squadId} join={join} isMember={isMember} />}
      />
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
            <Nav />
            <Views />
            <Toaster />
          </BrowserRouter>
        </HuddleClientProvider>
      </SWRConfig>
    </WagmiConfig>
  );
}

export default App;
