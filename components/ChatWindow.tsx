"use client";

import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { Message } from "@/types/chat";

interface Props {
  username: string;
}

export default function ChatWindow({ username }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const room = "general";

  useEffect(() => {
    if (!username) return;

    socket.connect();

    socket.emit("join_room", room);

    socket.on("previous_messages", (data: Message[]) => {
      setMessages(data);
    });

    socket.on("receive_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("previous_messages");
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [username]);

  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      sender: username,
      content: input,
      room,
    });

    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h2 className="font-semibold text-lg">General Room</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === username
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl shadow ${
                msg.sender === username
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              <div className="text-sm font-semibold">
                {msg.sender}
              </div>
              <div>{msg.content}</div>
              <div className="text-xs opacity-70 text-right">
                {new Date(msg.createdAt || "").toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-3">
        <input
          className="flex-1 border rounded-lg p-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
