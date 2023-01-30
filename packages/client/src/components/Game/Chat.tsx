import { FC } from "react";

interface ChatInputProps {}

interface Message {}

interface MessagesProps {
  messages: Message[];
}

interface ChatProps {}

const ChatInput: FC<ChatInputProps> = () => {
  return <input></input>;
};

const Messages: FC = () => {
  return <ul></ul>;
};

const Chat = () => {};
