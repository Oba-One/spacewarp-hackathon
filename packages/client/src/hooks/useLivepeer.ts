export const useLivepeer = () => {
  const getStreamSessions = async (streamId: string) => {
    try {
      const response = await fetch(
        `https://livepeer.studio/api/stream/${streamId}/sessions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Sessions Returned", data);

      // return data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    getStreamSessions,
  };
};
