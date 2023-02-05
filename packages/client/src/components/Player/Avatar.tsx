import { FC } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import { Player as LivePlayer } from "@livepeer/react";

import PlayerAvatar from "/assets/avatar1.png";
import OpponentAvatar from "/assets/avatar2.png";

import { RC as ChatIcon } from "../../assets/chat.svg";
import { RC as LogoutIcon } from "../../assets/logout.svg";
import { RC as SettingsIcon } from "../../assets/settings.svg";
import { RC as MicEnabledIcon } from "../../assets/mic-enabled.svg";
import { RC as MicDisabledIcon } from "../../assets/mic-disabled.svg";
import { RC as RecordingEnabledIcon } from "../../assets/recording-enabled.svg";
import { RC as RecordingDisabledIcon } from "../../assets/recording-disabled.svg";

import { huddleClient } from "../../modules/clients";

import { Input } from "../Input";
import { Button } from "../Button";
import { useOpponent, usePlayer } from "../../hooks/usePlayer";

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
  "relative grid place-items-center bg-slate-700 h-12 w-12 m-1 before:absolute p-1 rounded-full befor:bg-slate-700 cursor-pointer hover:bg-slate-600";

const generator = new AvatarGenerator();

// Simply get a random avatar
generator.generateRandomAvatar();

// Optionally specify a seed for the avatar. e.g. for always getting the same avatar for a user id.
// With seed 'avatar', always returns https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Black&hatColor=White&mouthType=Sad&skinColor=Yellow&topType=ShortHairShortWaved
generator.generateRandomAvatar("avatar");

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
    error,
    mics,
    isMicPaused,
    streamStatus,
    liveStream,
    huddleName,
    huddleAvatar,
    showSettings,
    setShowSettings,
    startLiveStream,
    stopLiveStream,
    handleConnection,
    handleDisconnection,
    connectForm,
  } = usePlayer(gameCode, setGameCode);

  const onStreamClick =
    streamStatus === "idle" || streamStatus === "connecting"
      ? startLiveStream
      : stopLiveStream;
  const onMicClick = !isMicPaused
    ? huddleClient.muteMic
    : huddleClient.enableMic;

  const StreamingIcon =
    streamStatus === "idle" || streamStatus === "connecting"
      ? RecordingDisabledIcon
      : RecordingEnabledIcon;
  const MicIcon = !isMicPaused ? MicEnabledIcon : MicDisabledIcon;

  return (
    <>
      <div id="player-avatar mask mask-hexagon-2">
        <img
          src={huddleAvatar ?? PlayerAvatar}
          alt={`Your player avatar`}
          className="h-2xl w-2xl -scale-x-100"
        />
      </div>
      {status === "connected" || status === "disconnecting" ? (
        <>
          <h3 className="text-xl font-semibold">
            {huddleName ?? "Player One"}
          </h3>
          <ul id="player-actions" className="flex justify-center gap-1">
            <li className={`${iconStyles}`} onClick={onMicClick}>
              <MicIcon />
            </li>
            <li className={`${iconStyles}`} onClick={onStreamClick}>
              <StreamingIcon />
            </li>
            <li
              className={`${iconStyles}`}
              onClick={() => setShowChat(!showChat)}
            >
              {hasNotifications && <Pulse />}
              <ChatIcon />
            </li>
            <li
              className={`${iconStyles}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <div>
                <h5>Select Mic</h5>
                <ul>
                  {mics.map((mic) => {
                    return <li>{mic.label}</li>;
                  })}
                </ul>
              </div>
              <SettingsIcon />
            </li>
            <li className={`${iconStyles}`} onClick={handleDisconnection}>
              <LogoutIcon />
            </li>
          </ul>
        </>
      ) : (
        <form
          id="player-connection"
          onSubmit={connectForm.handleSubmit(handleConnection, (errors) => {
            console.log("error", errors);
          })}
          className="flex w-full flex-col gap-3"
        >
          <Input
            placeholder="Player Name"
            {...connectForm.register("name", {
              required: true,
            })}
          />
          <Input
            type={"number"}
            placeholder="Game ID"
            {...connectForm.register("gameCode", {
              required: true,
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
          />
          <Button type="submit">Connect To HQ</Button>
        </form>
      )}
      <p className="h-4 px-1 text-xs leading-4 text-red-700 line-clamp-1">
        {error}
      </p>
      {liveStream.data?.playbackId && (
        <LivePlayer
          title={liveStream.data?.name}
          playbackId={liveStream.data?.playbackId}
          autoPlay
          muted
        />
      )}
    </>
  );
};

const Opponent: FC<OpponentAvatarProps> = ({ peerId }) => {
  const { name, avatar, isMicPaused, reaction } = useOpponent(peerId);

  return (
    <>
      <img
        src={avatar ?? OpponentAvatar}
        alt={`opponent avatar`}
        className="h-2xl w-2xl "
      />
      <h3 className="text-xl font-semibold">{name ?? "Opponent"}</h3>
      <ul id="opponent-actions" className="flex justify-center gap-2">
        <li className={`${iconStyles}`}>
          {!isMicPaused ? <MicEnabledIcon /> : <MicDisabledIcon />}
        </li>
        {reaction === "👀" && (
          <li className={`${iconStyles}`}>
            <RecordingEnabledIcon />
          </li>
        )}
      </ul>
    </>
  );
};

export const Avatar: FC<AvatarProps> = ({ peerId, type, ...props }) => {
  return (
    <div className="flex w-full flex-col items-center gap-1 px-4">
      {type === "player" ? <Player {...props} /> : <Opponent peerId={peerId} />}
    </div>
  );
};
