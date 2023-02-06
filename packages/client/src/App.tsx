import React from "react";
import { SWRConfig } from "swr";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Game from "./views/Game";
import League from "./views/Squad";

import { Nav } from "./components/Nav";
import { useLeague } from "./hooks/useLeague";
import { huddleClient, wagmiClient } from "./modules/clients";
import { StoreProvider } from './Store';
import { ErrorToast } from "./components/ErrorToast";

const Views = () => {
  const { squadMap, memberInfo, join } = useLeague();

  return (
    <Routes>
      <Route
        index
        element={
          <Game
            squadId={memberInfo.data?.squadAddress ?? `0x`}
            squadMap={squadMap}
            isMember={!!memberInfo.data?.squadAddress}
          />
        }
      />
      <Route
        path="/squad"
        element={
          <League
            squadId={memberInfo.data?.squadAddress ?? `0x`}
            join={join}
            isMember={!!memberInfo.data?.squadAddress}
          />
        }
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
          <StoreProvider>  
            <BrowserRouter>
              <Nav />
              <ErrorToast/>
              <Views />
              <Toaster />
            </BrowserRouter>
          </StoreProvider>
        </HuddleClientProvider>
      </SWRConfig>
    </WagmiConfig>
  );
}

export default App;
