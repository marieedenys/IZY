"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { saveConciergeChoice } from "@/lib/localTasteProfile";
import {
  INTAKE_QUESTIONS,
  getSuggestions,
  classifyMessage,
  guardrailReply,
  buildGuardrailSessionRow,
  buildFinishedSessionRow,
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

type Rating = "up" | "down";

const SAVE_FAILED_NOTICE = "Your session could not be saved.";

function createMessage(sender: "izy" | "user", text: string): Message {
  return { id: crypto.randomUUID(), sender, text };
}

export default function ConciergeChat() {
  const [sessionId] = useState(() => crypto.randomUUID());
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
  const [rating, setRating] = useState<Rating | null>(null);
  const [ratingSaving, setRatingSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, suggestions]);

  const pushMessage = (sender: "izy" | "user", text: string) =>
    setMessages((prev) => [...prev, createMessage(sender, text)]);

  /**
   * Logs the real Supabase error (code + message) for debugging, while the
   * user only ever sees the generic save-failure notice.
   */
  const flagSaveFailure = (context: string, error: unknown) => {
    if (error && typeof error === "object" && "code" in error) {
      const pgError = error as { code?: string; message?: string };
      console.error(
        `[concierge] ${context} failed:`,
        pgError.code,
        pgError.message,
      );
    } else {
      console.error(`[concierge] ${context} failed:`, error);
    }
    setSaveNotice(SAVE_FAILED_NOTICE);
  };

  /** Clears a stale failure notice as soon as a later save succeeds. */
  const clearSaveFailure = () => setSaveNotice(null);

  const finish = async (finalAnswers: Required<Answers>) => {
    const result = getSuggestions(
      finalAnswers.craving,
      finalAnswers.occasion,
      finalAnswers.budget,
    );
    pushMessage("izy", "Here's what I'd suggest:");
    setSuggestions(result);
    saveConciergeChoice({
      craving: finalAnswers.craving,
      occasion: finalAnswers.occasion,
      budget: finalAnswers.budget,
    });

    try {
      const row = buildFinishedSessionRow({
        sessionId,
        craving: finalAnswers.craving,
        occasion: finalAnswers.occasion,
        budget: finalAnswers.budget,
      });
      const { error } = await supabase.from("concierge_sessions").insert(row);
      if (error) {
        flagSaveFailure("concierge_sessions insert (recommended)", error);
      } else {
        clearSaveFailure();
      }
    } catch (error) {
      flagSaveFailure("concierge_sessions insert (recommended)", error);
    }
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
      void finish(nextAnswers as Required<Answers>);
    }
  };

  const handleSend = async () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    setTextInput("");
    pushMessage("user", trimmed);

    const category = classifyMessage(trimmed);
    pushMessage("izy", guardrailReply(category));

    // Every guardrail event is its own row, with its own fresh id — never
    // the chat's session id, which the finished-session row owns.
    const row = buildGuardrailSessionRow({
      eventId: crypto.randomUUID(),
      category,
      craving: answers.craving,
      occasion: answers.occasion,
      budget: answers.budget,
      message: trimmed,
    });
    try {
      const { error } = await supabase.from("concierge_sessions").insert(row);
      if (error) {
        flagSaveFailure("concierge_sessions insert (guardrail)", error);
      } else {
        clearSaveFailure();
      }
    } catch (error) {
      flagSaveFailure("concierge_sessions insert (guardrail)", error);
    }

    if (step < INTAKE_QUESTIONS.length) {
      pushMessage("izy", INTAKE_QUESTIONS[step].prompt);
    }
  };

  const handleRate = async (value: Rating) => {
    if (rating) return;
    setRating(value);
    setRatingSaving(true);
    try {
      const { error } = await supabase.from("concierge_feedback").insert({
        session_id: sessionId,
        rating: value,
      });
      if (error) {
        flagSaveFailure("concierge_feedback insert", error);
      } else {
        clearSaveFailure();
      }
    } catch (error) {
      flagSaveFailure("concierge_feedback insert", error);
    } finally {
      setRatingSaving(false);
    }
  };

  const currentQuestion =
    step < INTAKE_QUESTIONS.length ? INTAKE_QUESTIONS[step] : null;
  const showRatingButtons = !currentQuestion && suggestions && !rating;

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

        {rating && (
          <div className="max-w-[85%] self-start rounded-lg border border-bordeaux/20 bg-cream px-4 py-2 font-serif text-sm text-ink">
            Thanks for the feedback!
          </div>
        )}

        {saveNotice && (
          <p className="self-center text-xs text-ink/50">{saveNotice}</p>
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

      {showRatingButtons && (
        <div className="flex items-center justify-center gap-4 border-t border-bordeaux/10 p-3">
          <button
            type="button"
            disabled={ratingSaving}
            onClick={() => handleRate("up")}
            className="rounded-full border border-bordeaux px-4 py-1.5 font-serif text-sm text-bordeaux transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            👍 Helpful
          </button>
          <button
            type="button"
            disabled={ratingSaving}
            onClick={() => handleRate("down")}
            className="rounded-full border border-bordeaux px-4 py-1.5 font-serif text-sm text-bordeaux transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            👎 Not for me
          </button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend();
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
