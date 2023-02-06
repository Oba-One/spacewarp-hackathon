import { fetchSigner } from "@wagmi/core";
import { useProvider, useContract, useContractRead } from "wagmi";

import { abi } from "../types/LeagueABI.json";

export const useSquad = (address: `0x${string}`) => {
  const provider = useProvider();
  const squadContract = useContract({
    address,
    abi,
    signerOrProvider: provider,
  });

  const squad = useContractRead({
    address,
    abi,
    functionName: "getInfo",
  }).data;
  const assets = useContractRead<any, "", Asset[]>({
    address,
    abi,
  }).data;
  const members = useContractRead<any, "", Member[]>({
    address,
    abi,
    functionName: "getMembers",
  }).data;
  const proposals = useContractRead<any, "", Proposal[]>({
    address,
    abi,
    functionName: "getProposals",
  }).data;

  async function proposeUpdate(
    assetId: number,
    description: string,
    url: string
  ) {
    try {
      if (!squadContract) throw new Error("No squadContract defined");

      const signer = await fetchSigner({ chainId: 3141 });
      const proposal = await squadContract
        // @ts-ignore
        .connect(signer)
        .proposeUpdate(assetId, description, url, {
          gasLimit: 2500000000,
        });

      console.log("Proposal Made", proposal);
    } catch (error) {
      console.log("Error proposing update", error);
    }
  }

  async function voteOnProposal(
    assetId: number,
    proposalId: number,
    vote: boolean
  ) {
    try {
      if (!squadContract) throw new Error("No squadContract defined");

      const signer = await fetchSigner({ chainId: 3141 });
      const proposal = await squadContract
        // @ts-ignore
        .connect(signer)
        .proposeUpdate(assetId, proposalId, vote, {
          gasLimit: 2500000000,
        });

      console.log("Vote Made!", proposal);
    } catch (error) {
      console.log("Error voting on proposal", error);
    }
  }

  return {
    squad,
    assets,
    members,
    proposals,
    proposeUpdate,
    voteOnProposal,
  };
};
