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
    <aside className="relative py-3">
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
