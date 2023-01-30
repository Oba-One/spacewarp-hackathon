import { FC, useEffect, useState } from "react";
import { useRootStore } from "@huddle01/huddle01-client";

import { huddleClient } from "modules/clients";

type IChatType = "text" | "file" | "video" | "audio";

interface ChatInputProps {
  sendMessage: (message: string, toId: string, fromId: string) => Promise<void>;
}

interface IChatMessage {
  id: string;
  peerId: string;
  displayName?: string | undefined;
  type: IChatType;
  message?: string | undefined;
  timestamp?: string | undefined;
  error?:
    | {
        type?: string | undefined;
        isError: boolean;
      }
    | undefined;
}

interface MessagesProps {
  view: "history" | "notifications";
  messages: IChatMessage[];
  notifications: IChatMessage[];
}

interface ChatProps {
  peerId: string;
}

const ChatInput: FC<ChatInputProps> = () => {
  return <input></input>;
};

const Messages: FC<MessagesProps> = ({ view, messages, notifications }) => {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>{message.message}</li>
      ))}
    </ul>
  );
};

export const Chat: FC<ChatProps> = ({ peerId }) => {
  const messages = useRootStore((state) => state.chat[peerId]);

  const [messageView, setMessageView] = useState<"history" | "notifications">(
    "notifications"
  );
  const [notifications, setNotifications] = useState<IChatMessage[]>([]);

  useEffect(() => {
    const newMessage = messages[messages.length - 1];

    if (newMessage) {
      setNotifications((notifications) => [...notifications, newMessage]);

      setTimeout(() => {
        setNotifications((notifications) =>
          notifications.filter(
            (notification) => notification.id !== newMessage.id
          )
        );
      }, 5000);
    }
  }, [messages]);

  return (
    <>
      <ChatInput sendMessage={huddleClient.sendDM} />
      <Messages
        view={messageView}
        messages={messages}
        notifications={notifications}
      />
    </>
  );
};
