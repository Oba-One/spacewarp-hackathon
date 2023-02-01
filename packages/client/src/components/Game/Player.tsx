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
    <aside className="min-w-xs relative z-10 flex h-3/4 w-1/5 max-w-sm flex-col border-2 border-slate-700 py-3">
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
