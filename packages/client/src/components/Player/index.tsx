import { FC, useState } from "react";
import { Chat } from "./Chat";
import { Avatar, PlayerProps } from "./Avatar";

export const Player: FC<PlayerProps> = ({
  gameCode,
  setGameCode,
  ...props
}) => {
  const [showChat, setShowChat] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  return (
    <aside
      className={`absolute py-3 ${
        props.type === "player" ? "right-0" : "left-0"
      }`}
    >
      <Avatar
        {...props}
        gameCode={gameCode}
        setGameCode={setGameCode}
        showChat={showChat}
        setShowChat={setShowChat}
        hasNotifications={hasNotifications}
      />
      <Chat
        {...props}
        showChat={showChat}
        setHasNotifications={setHasNotifications}
      />
    </aside>
  );
};
