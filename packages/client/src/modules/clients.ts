import { createReactClient, studioProvider } from "@livepeer/react";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { getDefaultProvider } from "ethers";
import { createClient } from "wagmi";

export const wagmiClient = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
});

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY ?? "",
  }),
});

export const huddleClient = getHuddleClient(
  import.meta.env.VITE_VERCEL_HUDDLE_API_KEY ?? ""
);
