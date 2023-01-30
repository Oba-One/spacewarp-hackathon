import { FC, useState } from "react";
import { useCreateStream } from "@livepeer/react";
import { useRootStore } from "@huddle01/huddle01-client/*";
import { huddleClient } from "modules/clients";
import { useAccount } from "wagmi";

interface AvatarProps {
  gameId: string;
  peerId: string;
  type: "player" | "opponent";
}

interface PlayerProps {
  gameId: string;
}

interface OpponentProps {
  peerId: string;
}

const Player: FC<PlayerProps> = ({ gameId }) => {
  const [name, setName] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [huddleEnabled, setHuddleEnabled] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const { address } = useAccount();
  const livestream = useCreateStream({
    name: `MudSnap Game: ${gameId}`,
  });
  const avatarUrl = useRootStore((state) => state.avatarUrl);
  const micEnabled = useRootStore((state) => !state.isMicPaused);

  async function joinHuddle(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (!address) throw new Error("No address found");

      await huddleClient.join(`mudsnap-${gameId}`, {
        address,
        wallet: "metamask",
        ens: `${name}.eth}`,
      });
      setHuddleEnabled(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateAvatar(e: React.FormEvent<HTMLFormElement>) {
    try {
      await huddleClient.changeAvatarUrl("https://i.imgur.com/0nD6C7z.png");
    } catch (error) {
      console.error(error);
    }
  }

  async function startLiveStream() {
    try {
      await livestream.mutateAsync?.();
      await huddleClient.sendReaction("👀");

      setIsStreaming(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function stopLiveStream() {
    try {
      await huddleClient.sendReaction("");
      setIsStreaming(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        {!isEditingAvatar && (
          <dialog
            id="edit-avatar"
            open={isEditingAvatar}
            onClick={(e) => {
              setIsEditingAvatar(false);
              e.currentTarget.close();
            }}
          >
            <form method="dialog" onSubmit={updateAvatar}>
              <input
                type="text"
                placeholder="New avatar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
              />
              <button type="submit">Update</button>
            </form>
          </dialog>
        )}
        <img
          src={avatarUrl}
          alt={`Your player avatar`}
          onClick={() => setIsEditingAvatar(true)}
        />
        ;
      </div>
      {!huddleEnabled ? (
        <>
          <div
            className=""
            onClick={micEnabled ? huddleClient.muteMic : huddleClient.enableMic}
          >
            {micEnabled ? <div>On</div> : <div>Muted</div>}
          </div>
          <div
            className=""
            onClick={isStreaming ? stopLiveStream : startLiveStream}
          >
            {isStreaming ? <div>Streaming</div> : <div>Start Stream</div>}
          </div>
        </>
      ) : (
        <form onSubmit={joinHuddle}>
          <input
            type="text"
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
          <button type="submit">Join Huddle</button>
        </form>
      )}
    </>
  );
};

const Opponent: FC<OpponentProps> = ({ peerId }) => {
  const avatarUrl = useRootStore((state) => state.peers[peerId].avatarUrl);
  const micEnabled = useRootStore((state) => !state.peers[peerId].isMicPaused);
  const reaction = useRootStore((state) => state.peers[peerId].reaction);

  return (
    <>
      <img src={avatarUrl} alt={`Opponent avatar`} />;
      <div className="">{micEnabled ? <div>On</div> : <div>Muted</div>}</div>
      {reaction === "👀" && <div>Streaming</div>}
    </>
  );
};

export const Avatar: FC<AvatarProps> = ({ gameId, peerId, type }) => {
  return (
    <div className="">
      {type === "player" ? (
        <Player gameId={gameId} />
      ) : (
        <Opponent peerId={peerId} />
      )}
    </div>
  );
};
