"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  sender: "izy" | "user";
  text: string;
};

function createMessage(sender: "izy" | "user", text: string): Message {
  return { id: crypto.randomUUID(), sender, text };
}

export default function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>(() => [
    createMessage(
      "izy",
      "Hi, I'm the Izy Concierge. I'll ask you a few quick questions, then suggest three places to eat.",
    ),
  ]);
  const [textInput, setTextInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    setTextInput("");
    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border border-bordeaux/20 bg-white">
      <div
        ref={logRef}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-lg px-4 py-2 font-serif text-sm ${
              message.sender === "izy"
                ? "self-start border border-bordeaux/20 bg-cream text-ink"
                : "self-end bg-bordeaux text-cream"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border-t border-bordeaux/10 p-3"
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-full border border-bordeaux/30 bg-cream px-4 py-2 font-serif text-sm text-ink placeholder:text-ink/40 focus:border-bordeaux focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-bordeaux px-5 py-2 font-serif text-sm text-cream transition-opacity hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}
