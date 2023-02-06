import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useRootStore } from "@huddle01/huddle01-client";

import { RC as SendIcon } from "../../assets/send.svg";
import { RC as HistoryIcon } from "../../assets/history.svg";
import { huddleClient } from "../../modules/clients";

import { Input } from "../Input";
import { smallIconStyles } from "./player.styles";

type IChatType = "text" | "file" | "video" | "audio";

interface ChatInputProps {
  type: "player" | "opponent";
  peerId: string;
  opponentId?: string;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
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
  type: "player" | "opponent";
  peerId: string;
  opponentId?: string;
  showChat: boolean;
  setHasNotifications: (hasNotifications: boolean) => void;
}

const ChatInput: FC<ChatInputProps> = ({
  peerId,
  opponentId,
  sendMessage,
  setShowHistory,
  type
}) => {
  const isPlayer = type === 'player';
  const { handleSubmit } = useForm<{ msg: string }>({
    shouldUseNativeValidation: true,
  });

  async function handleSendMessage({ msg }: { msg: string }) {
    try {
      if (!opponentId) throw new Error("Missing opponent ID");

      await sendMessage(msg, opponentId, peerId);
    } catch (error) {
      console.log("Error Sending Message", error);
    }
  }
  return (
    <div className={`flex gap-2 items-center ${isPlayer ? 'justify-center' : 'ml-5'}`}>
      {isPlayer ?
        <form onSubmit={handleSubmit(handleSendMessage)}>
          <Input ghost icon={{ Svg: SendIcon, title: "Send Message" }} />
        </form> : null
      }
      <div
        className={`${smallIconStyles}`}
        onClick={() => setShowHistory((view) => !view)}
      >
        <HistoryIcon className='w-6 h-6' viewBox="0 0 39 39" />
      </div>
    </div>
  );
};

const Message: FC<IChatMessage> = ({
  peerId,
  displayName,
  // type,
  message,
  timestamp,
}) => {
  return (
    <li className="relative m-2 flex w-full flex-col gap-2 px-3 py-2 before:absolute  before:-inset-0 before:bg-slate-700">
      <div className="flex w-full	justify-between line-clamp-1">
        <h5>{displayName ?? peerId}</h5>
        <span>{new Date(timestamp ?? "").toLocaleTimeString()}</span>
      </div>
      <p className="w-full pl-1 line-clamp-4">{message}</p>
    </li>
  );
};

const Messages: FC<MessagesProps> = ({ view, messages, notifications }) => {
  return (
    <ul>
      {view === "history"
        ? messages.map((msg) => <Message key={msg.id} {...msg} />)
        : notifications.map((msg) => <Message key={msg.id} {...msg} />)}
    </ul>
  );
};

export const Chat: FC<ChatProps> = ({
  peerId,
  opponentId,
  showChat,
  setHasNotifications,
  type
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [notifications, setNotifications] = useState<IChatMessage[]>([]);

  const messages = useRootStore((state) => state.chat[peerId]);

  useEffect(() => {
    if (!messages) return;

    const newMessage = messages[messages.length - 1];

    messages.length ? setHasNotifications(true) : setHasNotifications(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <>
      <ChatInput
        type={type}
        setShowHistory={setShowHistory}
        sendMessage={huddleClient.sendDM}
        peerId={peerId}
        opponentId={opponentId}
      />
      <Messages
        view={showHistory ? "history" : "notifications"}
        messages={messages ?? []}
        notifications={notifications}
      />
    </>
  );
};
