"use client";

import { useEffect, useRef, useState } from "react";
import {
  INTAKE_QUESTIONS,
  getSuggestions,
  type Budget,
  type Craving,
  type Occasion,
  type Suggestion,
} from "@/lib/concierge";

type Message = {
  id: string;
  sender: "izy" | "user";
  text: string;
};

type Answers = {
  craving?: Craving;
  occasion?: Occasion;
  budget?: Budget;
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
    createMessage("izy", INTAKE_QUESTIONS[0].prompt),
  ]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [textInput, setTextInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, suggestions]);

  const pushMessage = (sender: "izy" | "user", text: string) =>
    setMessages((prev) => [...prev, createMessage(sender, text)]);

  const finish = (finalAnswers: Required<Answers>) => {
    const result = getSuggestions(
      finalAnswers.craving,
      finalAnswers.occasion,
      finalAnswers.budget,
    );
    pushMessage("izy", "Here's what I'd suggest:");
    setSuggestions(result);
  };

  const handleAnswer = (value: string) => {
    const question = INTAKE_QUESTIONS[step];
    pushMessage("user", value);
    const nextAnswers: Answers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep < INTAKE_QUESTIONS.length) {
      pushMessage("izy", INTAKE_QUESTIONS[nextStep].prompt);
    } else {
      finish(nextAnswers as Required<Answers>);
    }
  };

  const handleSend = () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    setTextInput("");
    pushMessage("user", trimmed);
  };

  const currentQuestion =
    step < INTAKE_QUESTIONS.length ? INTAKE_QUESTIONS[step] : null;

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

        {suggestions && (
          <div className="flex max-w-[85%] flex-col gap-3 self-start">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.name}
                className="rounded-lg border border-bordeaux/20 bg-white p-4"
              >
                <p className="font-serif font-semibold text-bordeaux">
                  {suggestion.name}
                </p>
                <p className="mt-1 text-sm text-ink/70">
                  {suggestion.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentQuestion && (
        <div className="flex flex-wrap gap-2 border-t border-bordeaux/10 p-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAnswer(option)}
              className="rounded-full border border-bordeaux px-4 py-1.5 font-serif text-sm text-bordeaux transition-opacity hover:opacity-80"
            >
              {option}
            </button>
          ))}
        </div>
      )}

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
