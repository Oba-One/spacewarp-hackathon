import { useStore } from "../Store";

interface Stream {
  name: string;
  id: string;
  createdAt: number;
  streamKey: string;
  playbackId: string;
  isActive: boolean;
  lastSeen: number;
  record: boolean;
  sourceSegments?: number;
  transcodedSegments?: number;
  sourceSegmentsDuration?: number;
  transcodedSegmentsDuration?: number;
}

interface StreamSession {
  sourceSegmentsDuration: number;
  id: string;
  record: boolean;
  parentId: string;
  recordingStatus: string;
  recordingUrl: string;
  // "https://fra-cdn.livepeer.studio/recordings/bbbbbbbb-bbbb-bbbb-bbbb-bbbb/index.m3u8";
}

export const useLivepeer = () => {
  const {updateError} = useStore();
  const getStreams = async () => {
    try {
      const response = await fetch(
        `https://livepeer.studio/api/stream/?streamsonly=1&filters=[{"id": "record", "value": true}]`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY ?? ""
            }`,
            "Content-Type": "application/json",
          },
        }
      );
    
      const data: Stream[] = await response.json();

      return data;
    } catch (error) {
      updateError('Error fetching streams');
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
              import.meta.env.VITE_VERCEL_LIVEPEER_API_KEY ?? ""
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: StreamSession[] = await response.json();

      return data;
    } catch (error: any) {
      updateError(error.message ?? 'Error')
      console.log("Error", error);
    }
  };

  return {
    getStreams,
    getStreamSessions,
  };
};
