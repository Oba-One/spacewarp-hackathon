export const useCollectible = (collectible: Collectible) => {
  async function redeem() {
    const res = await fetch(`/collectibles/${collectible.id}/redeem`, {
      method: "POST",
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
    redeem,
    uploadGameStream,
  };
};
