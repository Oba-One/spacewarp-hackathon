import { FC } from "react";

import PlayerAvatar from "/assets/avatar1.png";
import OpponentAvatar from "/assets/avatar2.png";
import ChatIcon from "../../assets/chat.svg";
import LogoutIcon from "../../assets/chat.svg";
import MicEnabledIcon from "../../assets/mic-enabled.svg";
import MicDisabledIcon from "../../assets/mic-disabled.svg";
import RecordingEnabledIcon from "../../assets/recording-enabled.svg";
import RecordingDisabledIcon from "../../assets/recording-disabled.svg";

import { huddleClient } from "../../modules/clients";

import { Input } from "../Input";
import { Button } from "../Button";
import { useOpponent, usePlayer } from "./usePlayer";

export interface PlayerProps extends GameProps, OpponentAvatarProps {
  type: "player" | "opponent";
  opponentId?: string;
}

interface GameProps {
  gameCode: number;
  setGameCode: (gameCode: number) => void;
}

interface PlayerAvatarProps extends GameProps {
  showChat: boolean;
  hasNotifications: boolean;
  setShowChat: (showChat: boolean) => void;
}

interface OpponentAvatarProps {
  peerId: string;
}

export interface AvatarProps extends PlayerAvatarProps, OpponentAvatarProps {
  type: "player" | "opponent";
}

export const iconStyles =
  "relative h-12 w-12 m-1 before:absolute before:rounded-full beforehover:bg-slate-700";

const Pulse = () => (
  <span className="flex h-3 w-3">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
  </span>
);

const Player: FC<PlayerAvatarProps> = ({
  gameCode,
  setGameCode,
  showChat,
  setShowChat,
  hasNotifications,
}) => {
  const {
    status,
    micEnabled,
    streamStatus,
    isEditingAvatar,
    setIsEditingAvatar,
    huddleAvatar,
    updateAvatar,
    startLiveStream,
    stopLiveStream,
    handleConnection,
    handleDisconnection,
    forms: { avatar, connect },
  } = usePlayer(gameCode, setGameCode);

  const onStreamClick =
    streamStatus === "idle" || streamStatus === "connecting"
      ? startLiveStream
      : stopLiveStream;
  const onMicClick = micEnabled ? huddleClient.muteMic : huddleClient.enableMic;

  const StreamingIcon =
    streamStatus === "idle" || streamStatus === "connecting"
      ? RecordingDisabledIcon
      : RecordingEnabledIcon;
  // const MicIcon = micEnabled ? MicEnabledIcon : MicDisabledIcon;

  return (
    <>
      <div id="player-avatar">
        {isEditingAvatar && (
          <div id="edit-avatar">
            <form onSubmit={avatar.handleSubmit(updateAvatar)}>
              <Input
                placeholder="New avatar"
                required
                {...(avatar.register("avatar"),
                {
                  type: "url",
                })}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
        <img
          src={huddleAvatar ?? PlayerAvatar}
          alt={`Your player avatar`}
          onClick={() => setIsEditingAvatar(true)}
          className="h-2xl w-2xl -scale-x-100"
        />
      </div>
      {status === "connected" || status === "disconnecting" ? (
        <>
          <div id="player-actions">
            <li className={`${iconStyles}`} onClick={onStreamClick}>
              <img src={StreamingIcon} />
            </li>
            <li className={`${iconStyles}`} onClick={onMicClick}>
              {/* <img src={MicIcon} /> */}
            </li>
            <li
              className={`${iconStyles}`}
              onClick={() => setShowChat(!showChat)}
            >
              {hasNotifications && <Pulse />}
              <ChatIcon />
            </li>
            <li className={`${iconStyles}`} onClick={handleDisconnection}>
              <LogoutIcon />
            </li>
          </div>
        </>
      ) : (
        <form
          id="player-connection"
          onSubmit={connect.handleSubmit(handleConnection)}
          className="flex w-full flex-col gap-3"
        >
          <Input
            placeholder="Player Name"
            {...connect.register("name", {
              required: true,
              minLength: 3,
              maxLength: 24,
            })}
          />
          <Input
            placeholder="Game ID"
            {...connect.register("gameCode", { required: true })}
          />
          <Button type="submit">Join Chat</Button>
        </form>
      )}
    </>
  );
};

const Opponent: FC<OpponentAvatarProps> = ({ peerId }) => {
  const { name, avatar, micEnabled, reaction } = useOpponent(peerId);

  return (
    <>
      <img
        src={avatar ?? OpponentAvatar}
        alt={`opponent avatar`}
        className="h-2xl w-2xl "
      />
      <h3 className="text-xl">{name ?? "Opponent"}</h3>;
      <ul id="opponent-actions">
        <li className={`${iconStyles}`}>
          {micEnabled ? null : <MicDisabledIcon />}
        </li>
        <li className={`${iconStyles}`}>
          {reaction === "👀" && <RecordingEnabledIcon />}
        </li>
      </ul>
    </>
  );
};

export const Avatar: FC<AvatarProps> = ({ peerId, type, ...props }) => {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-4">
      {type === "player" ? <Player {...props} /> : <Opponent peerId={peerId} />}
    </div>
  );
};
