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

  async function join() {
    const res = await fetch(`/squads/join`, {
      method: "POST",
    });
    return await res.json();
  }

  return {
    squad,
    assets,
    members,
    proposals,
    join,
  };
};
