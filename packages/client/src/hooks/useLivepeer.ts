export const useLivepeer = () => {
  const getStreams = async () => {
    try {
      const response = await fetch(
        `https://livepeer.studio/api/stream/?streamsonly=1&filters=[{"id": "record", "value": true}]`,
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

      console.log("Streams Returned", data);

      // return data;
    } catch (error) {
      console.log("Error fetching streams", error);
    }
  };
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
    getStreams,
    getStreamSessions,
  };
};
