import useSwr from "swr";
import { useContract } from "wagmi";
import { Asset } from "./useAsset";

export interface Squad {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
}

export interface Member {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
}

export interface Proposal {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSquad = (address: string) => {
  const squad = useContract({
    address,
  });

  const assets = useSwr<Asset[]>(`/squads/${address}/assets`, fetcher);
  const members = useSwr<Member[]>(`/squads/${address}/members`, fetcher);
  const proposals = useSwr<Proposal[]>(`/squads/${address}/members`, fetcher);

  async function joinSquad() {
    const res = await fetch(`/squads/joinSquad`, {
      method: "POST",
    });
    return await res.json();
  }

  return {
    squad,
    assets,
    members,
    proposals,
    joinSquad,
  };
};
