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

export const usePlayer = (
  gameCode: number,
  setGameCode: (code: number) => void
) => {
  // LOCAL STATE
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [streamStatus, setStreamStatus] = useState<Status>("idle");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // WALLET CONNECTION - Wagmi
  const { address } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // LIVE STREAM - Liverpeer
  const liveStream = useCreateStream({
    name: `MudSnap Game: ${gameCode}`,
  });

  // CHAT - Huddle
  const huddleAvatar = useRootStore((state) =>
    state.avatarUrl ? state.avatarUrl : null
  );
  const huddleName = useRootStore((state) =>
    state.displayName ? state.displayName : null
  );
  const micEnabled = useRootStore((state) => !state.isMicPaused);

  // FORMS
  const connectForm = useForm<FormValues>({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: huddleName || "",
      gameCode,
    },
  });
  const avatarForm = useForm<AvatarFormValues>({
    shouldUseNativeValidation: true,
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
    try {
      setStatus("connecting");

      if (!gameCode) throw new Error("No game id found");

      const addrs = address ? address : (await connectAsync()).account;

      await huddleClient.join(`mudsnap-${gameCode}`, {
        address: addrs,
        wallet: "metamask",
        ens: `${values.name}.eth}`,
      });

      setStatus("connecting");
      setGameCode(values.gameCode);
    } catch (error: any) {
      setError(error.message ?? "Issue connecting, please try again");
      console.error(error);
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
    setError,
    status,
    streamStatus,
    isEditingAvatar,
    setIsEditingAvatar,
    micEnabled,
    huddleName,
    huddleAvatar,
    forms: {
      connect: {
        register: connectForm.register,
        handleSubmit: connectForm.handleSubmit,
      },
      avatar: {
        register: avatarForm.register,
        handleSubmit: avatarForm.handleSubmit,
      },
    },
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
  const micEnabled = useRootStore(
    (state) => !state.peers[peerId]?.isMicPaused ?? false
  );
  const reaction = useRootStore((state) => state.peers[peerId]?.reaction ?? "");

  return {
    name,
    avatar,
    micEnabled,
    reaction,
  };
};
