import { useState } from "react";

import { useLighthouse } from "./useLighthouse";
import { useLivepeer } from "./useLivepeer";

export const useMatch = (
  match: Match,
  squadAddress: `0x${string}`,
  mint: (matchId: number) => Promise<void>
) => {
  const [streamCID, setStreamCID] = useState("");
  const [confirmMintModal, setConfirmMintModal] = useState(false);
  const [shouldUploadStream, setShouldUploadStream] = useState(true);

  const { getStreamSessions, getStreams } = useLivepeer();
  const { encryptFile, applyAccessConditions } = useLighthouse();

  async function mintCollectible() {
    if (!streamCID && shouldUploadStream) {
      setConfirmMintModal(true);
      return;
    }

    try {
      await mint(match.id);

      console.log("Minted Collectible", match.id);
    } catch (error) {
      console.error("Error redeeming collectible", error);
    }
  }

  async function uploadStream() {
    try {
      const streams = await getStreams();
      const stream = streams?.find(
        (stream) => stream.name === `mudsnap-match-${match.id}`
      );

      if (!stream) throw new Error("No stream found");

      const sessions = await getStreamSessions(stream.id);

      if (!sessions) throw new Error("No sessions found");

      const lastRecording = sessions[sessions.length - 1];

      const blob = await fetch(lastRecording.recordingUrl).then((r) =>
        r.blob()
      );

      const cid = await encryptFile(blob);

      setStreamCID(cid);

      await applyAccessConditions(cid, [
        {
          chain: "hyperspace",
          contractAddress: squadAddress,
          id: 3141,
          method: "balanceOf",
          returnValueTest: {
            comparator: ">=",
            value: 3,
          },
          standardContractType: "ERC1155",
          parameters: [":userAddress", "collectible"],
        },
      ]);

      console.log("Uploaded Game Stream", cid);
    } catch (error) {
      console.error("Error uploading game stream", error);
    }
  }

  async function handleConfirmMint(bool: boolean) {
    if (bool === true) {
      // Confirm
      setConfirmMintModal(false);
      setShouldUploadStream(false);
      await mintCollectible();
    } else {
      // Cancel
      setConfirmMintModal(false);
    }
  }

  return {
    uploadStream,
    mintCollectible,
    confirmMintModal,
    handleConfirmMint,
  };
};
