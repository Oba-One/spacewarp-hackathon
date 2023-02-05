import { useContractRead } from "wagmi";

export const useSquad = (address: `0x${string}`) => {
  const squad = useContractRead({
    address,
  });
  const assets = useContractRead<any, "", Asset[]>({
    address,
  });
  const matches = useContractRead<any, "", Match[]>({
    address,
  });
  const members = useContractRead<any, "", Member[]>({
    address,
  });
  const proposals = useContractRead<any, "", Proposal[]>({
    address,
  });

  return {
    squad,
    assets,
    matches,
    members,
    proposals,
  };
};
