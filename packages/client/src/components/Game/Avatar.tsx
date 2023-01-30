import { useCreateStream } from "@livepeer/react";

import React, { useState } from "react";

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>("");
  const {
    mutate: createStream,
    data: createdStream,
    status: createStatus,
  } = useCreateStream();

  async function startCapture(displayMediaOptions) {
    let captureStream: null | MediaStream = null;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    return captureStream;
  }

  return (
    <>
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />

      <button
        onClick={() => {
          createStream?.();
        }}
        disabled={createStatus === "loading" || !createStream}
      >
        Create Stream
      </button>
    </>
  );
};
