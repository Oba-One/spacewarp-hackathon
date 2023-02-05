import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { useLighthouse } from "./useLighthouse";
import { useLivepeer } from "./useLivepeer";

const address = import.meta.env.VITE_VERCEL_LEAGUE_CONTRACT_ADDRESS;

export const useMatch = (match: Match) => {
  const { getStreamSessions } = useLivepeer();
  const { encryptFile, applyAccessConditions } = useLighthouse();
  const prepareRedeem = usePrepareContractWrite({
    address,
    abi: [
      {
        name: "redeemCollectible",
        type: "function",
        stateMutability: "nonpayable",
        inputs: ["uint256"],
        outputs: [],
      },
    ],
    functionName: "redeemCollectible",
    args: [match.id],
  });
  const { writeAsync } = useContractWrite(prepareRedeem.config);

  async function mintCollectible() {
    try {
      if (!writeAsync) throw new Error("No writeAsync defined");
      const res = await writeAsync();

      console.log("Success redeeming collectible", res);
    } catch (error) {
      console.error("Error redeeming collectible", error);
    }
  }

  async function uploadStream() {
    try {
      const data = await getStreamSessions(`mudsnap-match-${match.id}`);
      console.log("Upload Game Stream", data);
    } catch (error) {
      console.error("Error uploading game stream", error);
    }
  }

  return {
    mintCollectible,
    uploadStream,
  };
};
