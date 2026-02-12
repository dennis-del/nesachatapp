"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  if (!username) return null;

  return (
    <div className="h-screen flex">
      <Sidebar username={username} />
      <ChatWindow username={username} />
    </div>
  );
}
