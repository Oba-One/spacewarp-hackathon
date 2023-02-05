import useSwr from "swr";
import { useContract } from "wagmi";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSquad = (address: string) => {
  const squad = useContract({
    address,
  });

  const assets = useSwr<Asset[]>(`/squads/${address}/assets`, fetcher);
  const members = useSwr<Member[]>(`/squads/${address}/members`, fetcher);
  const proposals = useSwr<Proposal[]>(`/squads/${address}/members`, fetcher);
  const matches = useSwr<Match[]>(`/squads/${address}/members`, fetcher);

  return {
    squad,
    assets,
    members,
    matches,
    proposals,
  };
};
