import { FC } from "react";
import { Chat } from "./Chat";
import { Avatar } from "./Avatar";

interface PlayerProps {
  gameId: string;
  peerId: string;
  type: "player" | "opponent";
}

export const Player: FC<PlayerProps> = ({ gameId, peerId, type }) => {
  return (
    <aside className="player ">
      <Avatar gameId={gameId} peerId={peerId} type={type} />
      <Chat peerId={peerId} />
    </aside>
  );
};
