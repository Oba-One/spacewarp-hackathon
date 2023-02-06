import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useAsset = (asset: Asset) => {
  const address = asset.squadId;

  const [proposal, setProposal] = useState<{
    description: string;
    url: string;
  }>();
  const [vote, setVote] = useState<{
    proposalId: number;
    vote: boolean;
  }>();

  const prepareProposal = usePrepareContractWrite({
    address,
    abi: [
      {
        name: "proposal",
        type: "function",
        stateMutability: "nonpayable",
        inputs: ["uint256", "string", "string"],
        outputs: [],
      },
    ],
    functionName: "proposal",
    args: [asset.id, proposal?.description, proposal?.url],
  });
  const prepareVote = usePrepareContractWrite({
    address: asset.squadId,
    abi: [
      {
        name: "proposalVote",
        type: "function",
        stateMutability: "nonpayable",
        inputs: ["uint256", "bool"],
        outputs: [],
      },
    ],
    functionName: "proposalVote",
    args: [vote?.proposalId, vote?.vote],
  });

  const writeProposal = useContractWrite(prepareProposal.config);
  const writeVote = useContractWrite(prepareVote.config);

  async function proposeUpdate(description: string, url: string) {
    setProposal({ description, url });
    try {
      if (!writeProposal.writeAsync) throw new Error("No writeAsync defined");
      await writeProposal.writeAsync();
      console.log("Success proposing update");
    } catch (error) {
      setProposal(undefined);
      console.log("Error proposing update", error);
    }
  }

  async function voteOnProposal(proposalId: number, vote: boolean) {
    setVote({ proposalId, vote });
    try {
      if (!writeVote.writeAsync) throw new Error("No writeAsync defined");
      await writeVote.writeAsync();
      console.log("Success voting on proposal");
    } catch (error) {
      setVote(undefined);
      console.log("Error voting on proposal", error);
    }
  }

  return {
    proposeUpdate,
    voteOnProposal,
  };
};
