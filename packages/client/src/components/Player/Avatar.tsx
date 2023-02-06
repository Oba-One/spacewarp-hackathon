import { FC } from "react";
import { AvatarGenerator } from "random-avatar-generator";

import PlayerAvatarPNG from "/assets/avatar1.png";
import OpponentAvatar from "/assets/avatar2.png";

import { RC as LogoutIcon } from "../../assets/logout.svg";
import { RC as MicEnabledIcon } from "../../assets/mic-enabled.svg";
import { RC as MicDisabledIcon } from "../../assets/mic-disabled.svg";
import { RC as RecordingEnabledIcon } from "../../assets/recording-enabled.svg";
import { RC as RecordingDisabledIcon } from "../../assets/recording-disabled.svg";

import { huddleClient } from "../../modules/clients";

import { Input } from "../Input";
import { Button } from "../Button";
import { useOpponent, usePlayer } from "../../hooks/usePlayer";
import { largeIconStyles } from "./player.styles";

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

const PlayerAvatar = ({ huddleAvatar }: { huddleAvatar: string | null }) =>
(<div id="player-avatar mask mask-hexagon-2">
  <img
    src={huddleAvatar ?? PlayerAvatarPNG}
    alt={`Your player avatar`}
    className="h-2xl w-2xl -scale-x-100"
  />
</div>)

const Player: FC<PlayerAvatarProps> = ({
  gameCode,
  setGameCode,
  showChat,
  setShowChat,
  hasNotifications,
}) => {
  const {
    status,
    mics,
    micState,
    streamStatus,
    huddleName,
    huddleAvatar,
    startLiveStream,
    stopLiveStream,
    handleConnection,
    handleDisconnection,
    connectForm,
  } = usePlayer(gameCode, setGameCode);

  const { isMicPaused } = micState
  const enabledMicGroupId = micState.mediaDevice?.groupId;

  const onStreamClick =
    streamStatus === "idle" || streamStatus === "connecting"
      ? startLiveStream
      : stopLiveStream;

  const onMicClick = () => {
    if (micState.deviceLoading)
      return
    if (!micState.mediaDevice?.groupId)
      return huddleClient.enableMic();

    !isMicPaused ? huddleClient.muteMic()
      : huddleClient.unmuteMic();
  };

  const StreamingIcon =
    streamStatus === "idle" || streamStatus === "connecting"
      ? RecordingDisabledIcon
      : RecordingEnabledIcon;

  return (
    <>
      {status === "connected" || status === "disconnecting" ? (
        <div className="flex grid grid-flow-col min-h-0 gap-1">
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className={`${largeIconStyles} m-1`}>{(isMicPaused || !enabledMicGroupId) ? <MicDisabledIcon /> : <MicEnabledIcon />}</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
              {mics.map((mic) => {
                return <li key={mic.deviceId}>
                  <div onClick={onMicClick}>{mic.label}
                    <a>{(!isMicPaused && mic.groupId === enabledMicGroupId) ? <MicEnabledIcon /> : <MicDisabledIcon />}</a>
                  </div>
                </li>;
              })}
            </ul>
          </div>
          <div className={`${largeIconStyles}`} onClick={onStreamClick}>
            <StreamingIcon />
          </div>

          <div className={`${largeIconStyles}`} onClick={handleDisconnection}>
            <LogoutIcon />
          </div>
          <div className="row-span-3">
            <PlayerAvatar huddleAvatar={huddleAvatar} />
          </div>
          <h3 className="text-xl font-bord row-span-1 row-start-4 h-25" style={{ textAlign: 'center', marginBottom: 5 }}>
            {huddleName ?? "Player One"}
          </h3>
        </div>
      ) : (
        <div className="flex grid grid-flow-row min-h-0 gap-1">
          <PlayerAvatar huddleAvatar={huddleAvatar} />
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
            <Button type="submit">Join Chat</Button>
          </form>
        </div>
      )}
    </>
  );
};

const Opponent: FC<OpponentAvatarProps> = ({ peerId }) => {
  const { name, avatar, isMicPaused, reaction } = useOpponent(peerId);

  return (
    <div className='flex grid grid-flow-col min-h-0 gap-1'>
      <div className="row-span-1">
        <img
          src={avatar ?? OpponentAvatar}
          alt={`opponent avatar`}
          className="h-2xl w-2xl"
        />
        <h3 className="font-bord text-xl font-semibold" style={{ textAlign: 'center', marginBottom: 5 }}>{name ?? "Opponent"}</h3>
      </div>
      <ul id="opponent-actions" className="flex justify-center gap-2 col-start-2">
        <li className={`${largeIconStyles}`}>
          {!isMicPaused ? <MicEnabledIcon /> : <MicDisabledIcon />}
        </li>
        {reaction === "👀" && (
          <li className={`${largeIconStyles}`}>
            <RecordingEnabledIcon />
          </li>
        )}
      </ul>
    </div>
  );
};

export const Avatar: FC<AvatarProps> = ({ peerId, type, ...props }) => {
  return (
    <div className="flex w-full flex-col items-center gap-1 px-4">
      {type === "player" ? <Player {...props} /> : <Opponent peerId={peerId} />}
    </div>
  );
};
