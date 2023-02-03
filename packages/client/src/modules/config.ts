import { SetupContractConfig } from "@latticexyz/std-client";
import { Wallet } from "ethers";
const params = new URLSearchParams(window.location.search);

export const config: SetupContractConfig = {
  clock: {
    period: 1000,
    initialTime: 0,
    syncInterval: 5000,
  },
  provider: {
    jsonRpcUrl: params.get("rpc") ?? "https://follower.testnet-chain.linfra.xyz",
    wsRpcUrl: params.get("wsRpc") ?? "wss://follower.testnet-chain.linfra.xyz",
    chainId: Number(params.get("chainId")) || 4242,
  },
  privateKey: Wallet.createRandom().privateKey,
  chainId: Number(params.get("chainId")) || 4242,
  snapshotServiceUrl: params.get("snapshot") ?? undefined,
  initialBlockNumber: Number(params.get("initialBlockNumber")) || 0,
  worldAddress: params.get("worldAddress") || "0xAA5cf75F386d96A8a1Ce321020F865dd2D7E9274",
  devMode: params.get("dev") === "true",
};
