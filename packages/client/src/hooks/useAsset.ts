export interface Asset {
  id: string;
  name: string;
  description: string;
  winner: string;
  image: string;
  stream: string;
  characters: string[];
  locations: string[];
  proposals: string[];
}

export const useAsset = (asset: Asset) => {
  async function proposeUpdate() {
    const res = await fetch(`/assets/${asset.id}/proposeUpdate`, {
      method: "POST",
    });
    return await res.json();
  }

  async function voteOnProposal() {
    const res = await fetch(`/assets/${asset.id}/tribute-to-team`, {
      method: "POST",
      body: JSON.stringify({ id: asset.id }),
    });
    return await res.json();
  }

  return {
    proposeUpdate,
    voteOnProposal,
  };
};