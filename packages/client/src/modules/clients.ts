import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { Chain, createClient, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createReactClient, studioProvider } from "@livepeer/react";

export const hyperspace = {
  id: 3141,
  name: "Hyperspace",
  network: "hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet Filecoin",
    symbol: "tFil",
  },
  rpcUrls: {
    public: {
      http: [
        import.meta.env.VITE_VERCEL_FVM_RPC_URL ??
          "https://api.hyperspace.node.glif.io/rpc/v1",
      ],
    },
    default: {
      http: [
        import.meta.env.VITE_VERCEL_FVM_RPC_URL ??
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
  testnet: true,
} as const satisfies Chain;

const { chains, provider, webSocketProvider } = configureChains(
  [hyperspace],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== hyperspace.id) return null;
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ]
);

export const clientChains = chains;

export const wagmiClient = createClient({
  // autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
  webSocketProvider,
});

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY ?? "",
  }),
});

export const huddleClient = getHuddleClient(
  import.meta.env.VITE_VERCEL_HUDDLE_API_KEY ?? ""
);
