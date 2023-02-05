import { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const address = import.meta.env.VITE_VERCEL_LEAGUE_CONTRACT_ADDRESS;

export const useLeague = () => {
  const [squadId, setSquadId] = useState<string>("");

  const squads = useContractRead<any, "", Squad[]>({
    address,
  }).data?.map((squad) => {
    return {
      id: squad.id,
      name: squad.name,
      description: squad.description,
      owner: squad.owner,
    };
  });

  const isMember = useContractRead<any, "", boolean>({}).data;

  const prepareJoinLeague = usePrepareContractWrite({
    address,
    abi: [
      {
        name: "memberJoin",
        type: "function",
        stateMutability: "nonpayable",
        inputs: ["address"],
        outputs: [],
      },
    ],
    functionName: "memberJoin",
    args: [squadId],
  });

  const { writeAsync } = useContractWrite(prepareJoinLeague.config);

  // Potential for joining a legue and being put in a draft or having to meet some criteria
  async function join(squad: string) {
    try {
      setSquadId(squad);

      if (!writeAsync) throw new Error("No writeAsync defined");

      const trasnaction = await writeAsync();

      return trasnaction.hash;
    } catch (error) {
      setSquadId("");
      console.error("Error joining league", error);
    }
  }

  return { squads, squadId, isMember, join };
};
