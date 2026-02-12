import { Message } from "@/types/chat";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  return (
    <div
      className={`flex ${
        message.isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs p-3 rounded-xl shadow ${
          message.isOwn
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div className="text-xs mt-1 opacity-70 text-right">
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
