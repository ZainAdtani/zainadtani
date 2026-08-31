import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const MAX_USER_MESSAGES = 20;
const COUNT_KEY = "zain_chat_count";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zain-chat`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! I'm Zain's assistant. Ask me about his services, books, or how to get in touch." },
  ]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(sessionStorage.getItem(COUNT_KEY) || "0");
  });
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const reachedLimit = count >= MAX_USER_MESSAGES;

  async function send() {
    const text = input.trim();
    if (!text || loading || reachedLimit) return;

    setError(null);
    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const nextCount = count + 1;
    setCount(nextCount);
    sessionStorage.setItem(COUNT_KEY, String(nextCount));

    let assistantSoFar = "";
    let assistantStarted = false;
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        if (!assistantStarted) {
          assistantStarted = true;
          return [...prev, { role: "assistant", content: assistantSoFar }];
        }
        return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) throw new Error(`HTTP ${resp.status}`);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("chat error", e);
      setError("Sorry, I am having trouble connecting. Please email zkadtani@gmail.com instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#DD5013] text-white shadow-[0_6px_20px_rgba(10,15,26,0.18)] hover:bg-[#C4460F] transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[400px] sm:h-[540px] flex flex-col bg-white sm:rounded-2xl border border-[#447BBE]/20 shadow-[0_12px_40px_rgba(10,15,26,0.16)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#447BBE]/15 bg-[#447BBE]/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#447BBE]" />
              <span className="text-sm font-semibold text-[#0A0F1A]">Ask me anything about Zain's work</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1 rounded hover:bg-[#447BBE]/10 text-[#0A0F1A]/60 hover:text-[#0A0F1A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#447BBE] text-white rounded-br-sm"
                      : "bg-[#F3F6FA] text-[#0A0F1A] rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F3F6FA] px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#447BBE]/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#447BBE]/60 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#447BBE]/60 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
            )}
            {error && <p className="text-xs text-destructive text-center">{error}</p>}
            {reachedLimit && (
              <p className="text-xs text-[#0A0F1A]/60 text-center">
                You've reached the message limit for this session. Email zkadtani@gmail.com to keep the conversation going.
              </p>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#447BBE]/15 p-3 bg-white">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                disabled={loading || reachedLimit}
                placeholder="Ask about services, books, or AI..."
                className="flex-1 bg-white text-[#0A0F1A] placeholder:text-[#0A0F1A]/45 text-sm rounded-full px-4 py-2.5 border border-[#447BBE]/30 focus:outline-none focus:border-[#447BBE] disabled:opacity-50"
              />
              <Button
                size="icon"
                onClick={send}
                disabled={loading || reachedLimit || !input.trim()}
                className="rounded-full bg-[#DD5013] text-white hover:bg-[#C4460F] shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
