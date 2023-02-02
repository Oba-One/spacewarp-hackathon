interface Collectible {
  id: string;
  name: string;
  description: string;
  winner: string;
  image: string;
  stream: string;
  characters: string[];
  locations: string[];
  tributed?: boolean;
  redeemed?: boolean;
}

export const useCollectible = (collectible: Collectible) => {
  async function redeem() {
    const res = await fetch(`/collectibles/${collectible.id}/redeem`, {
      method: "POST",
    });
    return await res.json();
  }

  async function tributeToTeam() {
    const res = await fetch(`/collectibles/${collectible.id}/tribute-to-team`, {
      method: "POST",
      body: JSON.stringify({ id: collectible.id }),
    });
    return await res.json();
  }

  async function uploadGameStream(stream: string) {
    const res = await fetch(`/collectibles/${collectible.id}/game-stream`, {
      method: "POST",
      body: JSON.stringify({ stream }),
    });
    return await res.json();
  }

  return {
    collectible,
    redeem,
    tributeToTeam,
    uploadGameStream,
  };
};
