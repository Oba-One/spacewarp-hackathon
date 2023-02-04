import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateStream } from "@livepeer/react";
import { useRootStore } from "@huddle01/huddle01-client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { huddleClient } from "../../modules/clients";

type FormValues = {
  name: string;
  gameCode: number;
};

type AvatarFormValues = {
  avatar: string;
};

type Status = "idle" | "connecting" | "connected" | "disconnecting";

type ErrorStatus = "connect_wallet" | "invalid_game_code" | "default";

const errorMsgs: Record<ErrorStatus, string> = {
  connect_wallet: "Please log into your Metamask or Browser wallet",
  invalid_game_code: "Invalid game code",
  default: "Issue connecting, please try again",
};

const errorHandler = (error: any): ErrorStatus => {
  if (error && typeof error.message === "string") {
    switch (error.message) {
      case "Invalid game code":
        return "invalid_game_code";
      case "Connector not found":
        return "connect_wallet";
      default:
        return "default";
    }
  } else {
    return "default";
  }
};

export const usePlayer = (
  gameCode: number,
  setGameCode: (code: number) => void
) => {
  // LOCAL STATE
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [streamStatus, setStreamStatus] = useState<Status>("idle");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // WALLET CONNECTION - Wagmi
  const { address } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // LIVE STREAM - Liverpeer
  const liveStream = useCreateStream({
    name: `daosmack-match-${gameCode}`,
  });

  // CHAT - Huddle
  const huddleAvatar = useRootStore((state) =>
    state.avatarUrl ? state.avatarUrl : null
  );
  const huddleName = useRootStore((state) =>
    state.displayName ? state.displayName : null
  );
  const isMicPaused = useRootStore((state) => state.isMicPaused ?? false);

  // FORMS
  const connectForm = useForm<FormValues>({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: huddleName || "",
      gameCode,
    },
  });
  const avatarForm = useForm<AvatarFormValues>({
    // shouldUseNativeValidation: true,
    defaultValues: {
      avatar: huddleAvatar || "",
    },
  });

  // METHODS
  async function updateAvatar(values: AvatarFormValues) {
    try {
      await huddleClient.changeAvatarUrl(values.avatar);
    } catch (error: any) {
      avatarForm.setError("avatar", {
        type: "validate",
      });
      avatarForm.trigger("avatar", {
        shouldFocus: true,
      });

      console.error(error);
      setError(error.message ?? "Issue updating avatar, please try again");
    }
  }

  async function startLiveStream() {
    try {
      setStreamStatus("connecting");
      if (!gameCode) throw new Error("No game id found");

      await liveStream.mutateAsync?.();
      await huddleClient.sendReaction("👀");

      setStreamStatus("connected");
    } catch (error: any) {
      console.error(error);
      setError(error.message ?? "Issue starting stream, please try again");
    }
  }

  async function stopLiveStream() {
    try {
      setStreamStatus("disconnecting");
      await huddleClient.sendReaction("");
      setStreamStatus("idle");
    } catch (error: any) {
      console.error(error);
      setError(error.message ?? "Issue stopping stream, please try again");
    }
  }

  async function handleConnection(values: FormValues) {
    console.log("handleConnection", values);

    try {
      setStatus("connecting");

      if (!gameCode) throw new Error("No game id found");

      const addrs = address ? address : (await connectAsync()).account;

      await huddleClient.join(`mudsnap-${gameCode}`, {
        address: addrs,
        wallet: "metamask",
        ens: `${values.name}.eth}`,
      });

      const mics = (await navigator.mediaDevices.enumerateDevices()).filter(
        (device) => device.kind === "audioinput"
      );

      setMics(mics);

      setStatus("connected");
      setGameCode(values.gameCode);
    } catch (error: any) {
      const errStatus = errorHandler(error.message);

      if (errStatus === "connect_wallet") {
        connectForm.setError("gameCode", {
          type: "validate",
        });
        connectForm.trigger("gameCode", {
          shouldFocus: true,
        });
      }

      setError(errorMsgs[errStatus]);
      console.error("Error Connecting", error.message);
    }
  }

  async function handleDisconnection() {
    try {
      setStatus("disconnecting");

      if (streamStatus) await stopLiveStream();
      if (status) disconnect();

      setStatus("idle");
      setIsEditingAvatar(false);
    } catch (error: any) {
      setError(error.message ?? "Issue disconnecting, please try again");
      console.error(error);
    }
  }

  return {
    error,
    status,
    streamStatus,
    isEditingAvatar,
    setIsEditingAvatar,
    showSettings,
    setShowSettings,
    liveStream,
    isMicPaused,
    mics,
    huddleAvatar,
    huddleName,
    avatarForm,
    connectForm,
    updateAvatar,
    startLiveStream,
    stopLiveStream,
    handleConnection,
    handleDisconnection,
  };
};

export const useOpponent = (peerId: string) => {
  const name = useRootStore(
    (state) => state.peers[peerId]?.displayName ?? null
  );
  const avatar = useRootStore(
    (state) => state.peers[peerId]?.avatarUrl ?? null
  );
  const isMicPaused = useRootStore(
    (state) => state.peers[peerId]?.isMicPaused ?? true
  );
  const reaction = useRootStore((state) => state.peers[peerId]?.reaction ?? "");

  return {
    name,
    avatar,
    isMicPaused,
    reaction,
  };
};
