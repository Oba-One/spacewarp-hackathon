import { createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createReactClient, studioProvider } from "@livepeer/react";

import { Chain } from "wagmi";

export const hyperspace = {
  id: 3141,
  name: "Hyperspace",
  network: "hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "Filecoin",
    symbol: "FIL",
  },
  rpcUrls: {
    public: {
      http: [
        import.meta.env.VITE_VERCEL_RPC_UR ??
          "https://api.hyperspace.node.glif.io/rpc/v1",
      ],
    },
    default: {
      http: [
        import.meta.env.VITE_VERCEL_RPC_UR ??
          "https://api.hyperspace.node.glif.io/rpc/v1",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Filfox Explorer",
      url: "https://hyperspace.filfox.info/en",
    },
  },
} as const satisfies Chain;

const { chains, provider } = configureChains(
  [hyperspace],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${chain.id}.example.com`,
      }),
    }),
    publicProvider(),
  ]
);

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY ?? "",
  }),
});

export const huddleClient = getHuddleClient(
  import.meta.env.VITE_VERCEL_HUDDLE_API_KEY ?? ""
);
