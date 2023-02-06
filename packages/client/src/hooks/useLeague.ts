import { fetchSigner } from "@wagmi/core";
import { useContract, useContractRead, useProvider } from "wagmi";

import { abi } from "../types/LeagueABI.json";

const address = import.meta.env.VITE_VERCEL_LEAGUE_CONTRACT_ADDRESS;

export const useLeague = () => {
  const provider = useProvider();

  const leagueContract = useContract({
    address,
    abi,
    signerOrProvider: provider,
  });

  const squadMap =
    useContractRead<any, "", Squad[]>({
      address,
      abi,
      functionName: "getSquads",
    }).data?.reduce((map: Record<string, Squad>, squad) => {
      map[squad.id] = squad;
      return map;
    }, {}) ?? {};

  const memberInfo = useContractRead<any, "", { squadAddress?: `0x${string}` }>(
    {
      address,
      abi,
      functionName: "getMemberInfo",
    }
  );

  const matches = useContractRead<any, "", Match[]>({
    address,
    abi,
    functionName: "getMatches",
  });

  // Potential for joining a legue and being put in a draft or having to meet some criteria
  async function join(squadAddress: `0x${string}`) {
    try {
      if (!leagueContract) throw new Error("No leagueContract defined");

      const signer = await fetchSigner({ chainId: 3141 });
      const squad = await leagueContract
        // @ts-ignore
        .connect(signer)
        .joinSquad(squadAddress, {
          gasLimit: 2500000000,
        });

      console.log("Squad Joined", squadMap[squadAddress], squad);
    } catch (error) {
      console.error("Error joining league", error);
    }
  }

  async function mintCollectible(matchId: number) {
    try {
      if (!leagueContract) throw new Error("No leagueContract defined");

      const signer = await fetchSigner({ chainId: 3141 });
      const collectible = await leagueContract
        // @ts-ignore
        .connect(signer)
        .redeemCollectible(matchId, {
          gasLimit: 2500000000,
        });

      console.log("Collectible Minted", collectible);
    } catch (error) {
      console.error("Error minting collectible", error);
    }
  }

  return { squadMap, memberInfo, matches, join, mintCollectible };
};
