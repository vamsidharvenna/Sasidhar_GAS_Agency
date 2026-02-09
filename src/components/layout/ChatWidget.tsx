import React, { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useLanguage } from "../../context/LanguageContext";
import { contactInfo } from "../../constants/data";
import { Button } from "../ui/Button";

type ChatItem = {
  from: "user" | "bot";
  text: string;
};

type Chip = {
  text: string;
  link?: string;
};

type ApiItem = {
  text?: string;
  chips?: Array<string | Chip>;
};

type ApiResponse = {
  items?: ApiItem[];
  messages?: string[];
  chips?: Array<string | Chip>;
};

const LANG_CHIPS: Chip[] = [{ text: "English" }, { text: "తెలుగు" }];

const normalizeChips = (chips?: Array<string | Chip>): Chip[] => {
  if (!chips) return [];
  const dedup = new Map<string, Chip>();
  chips
    .map((c) => {
      if (!c) return null;
      if (typeof c === "string") return { text: c } as Chip;
      if (typeof c === "object" && typeof (c as Chip).text === "string") return { text: (c as Chip).text, link: (c as Chip).link };
      return null;
    })
    .filter((c): c is Chip => !!c && !!c.text)
    .forEach((c) => {
      if (!dedup.has(c.text)) dedup.set(c.text, c);
    });
  return Array.from(dedup.values());
};

const languageFromChip = (text: string): "en" | "te" | undefined => {
  const t = text.trim().toLowerCase();
  if (t === "english" || t === "en") return "en";
  if (t === "తెలుగు" || t === "telugu" || t === "te") return "te";
  return undefined;
};

const fallbackPayload: Record<
  string,
  {
    title: string;
    subtitle: string;
    chips: string[];
  }
> = {
  en: {
    title: "Welcome to Sasidhar Gas Agency 👋",
    subtitle: "I’m here to help you.\nPlease choose one of the options below:",
    chips: [
      "🆕 New LPG Connection",
      "⏰ Office Timing",
      "📝 Complaint / Issue Registration",
      "📍 Address & Directions",
      "📞 Delivery Boy & Staff Contact Details",
      "🚚 Estimated Delivery by Areas",
      "🛡️ Safety Guidance",
    ],
  },
  te: {
    title: "శశిధర్ గ్యాస్ ఏజెన్సీకి స్వాగతం 👋",
    subtitle: "నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను.\nదయచేసి క్రింది ఎంపికలలో ఒకదాన్ని ఎంచుకోండి:",
    chips: [
      "🆕 కొత్త LPG గ్యాస్ కనెక్షన్",
      "⏰ కార్యాలయ సమయం",
      "🚚 ప్రాంతాల వారీగా డెలివరీ అంచనా",
      "📝 ఫిర్యాదు / సమస్య నమోదు",
      "📍 చిరునామా & దిశలు",
      "📞 డెలివరీ బాయ్ వివరాలు",
      "🛡️ భద్రతా మార్గదర్శకాలు",
    ],
  },
};




export const ChatWidget: React.FC = () => {
  const { isChatOpen, closeChat } = useChat();
  const { language, setLanguage } = useLanguage();
  const API_BASE = useMemo(() => import.meta.env.VITE_DFCX_API_BASE_URL ?? "", []);

  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const endpoint = API_BASE ? `${API_BASE}/api/dfcx/detect-intent` : "";

  // Scroll to bottom on updates
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, chips, isChatOpen]);

  // When chat opens, start a fresh session and proactively fetch welcome
  useEffect(() => {
    if (!isChatOpen) return;
    const newId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    setSessionId(newId);
    setMessages([]);
    setChips([]);
    setInput("");
    void sendWelcome(newId, language, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpen]);

  const pushMessage = (from: "user" | "bot", text: string) => {
    if (!text) return;
    setMessages((prev) => {
      if (prev.length && prev[prev.length - 1].from === from && prev[prev.length - 1].text === text) {
        return prev; // avoid consecutive duplicates
      }
      return [...prev, { from, text }];
    });
  };

  const processResponse = (data: ApiResponse) => {
    const chipSet = new Map<string, Chip>();

    if (data?.items?.length) {
      data.items.forEach((item) => {
        if (item.text) pushMessage("bot", item.text);
        normalizeChips(item.chips).forEach((c) => chipSet.set(c.text, c));
      });
    } else if (data?.messages?.length) {
      data.messages.forEach((m) => pushMessage("bot", m));
    }

    normalizeChips(data?.chips).forEach((c) => chipSet.set(c.text, c));

    setChips(Array.from(chipSet.values()));
  };

  const changeLanguage = async (lang: "en" | "te") => {
    setLanguage(lang);
    setMessages([]);
    setChips([]);
    setInput("");
    if (sessionId) {
      await sendWelcome(sessionId, lang, false);
    }
  };

  const sendWelcome = async (sid: string, lang: string, silentOnError = false) => {
    setLoading(true);
    setChips([]);
    try {
      if (!endpoint) throw new Error("No backend configured");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "welcome", sessionId: sid, language: lang }),
      });
      if (!res.ok) throw new Error("Unable to connect. Please try again.");
      const data = (await res.json()) as ApiResponse;
      processResponse(data);
    } catch (err: any) {
      if (!silentOnError) {
        // fallback on error only when not silent
        const payload = fallbackPayload[lang] ?? fallbackPayload.en;
        pushMessage("bot", `${payload.title}
${payload.subtitle}`);
        setChips(payload.chips.map((text) => ({ text })));
      }
      console.warn("welcome failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (textValue?: string) => {
    const trimmed = (textValue ?? input).trim();
    if (!trimmed || !endpoint) return;

    // language chip handling: set language and refresh welcome
    const langHit = languageFromChip(trimmed);
    if (langHit) {
      await changeLanguage(langHit as "en" | "te");
      setInput("");
      return;
    }

    pushMessage("user", trimmed);
    setInput("");
    setLoading(true);
    setChips([]);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, sessionId, language }),
      });
      if (!res.ok) throw new Error("Unable to connect. Please try again.");
      const data = (await res.json()) as ApiResponse;
      processResponse(data);
    } catch (err: any) {
      pushMessage("bot", err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chip: Chip) => {
    if (chip.link) {
      const url = chip.link;
      if (url.startsWith("tel:") || url.startsWith("mailto:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      return;
    }
    void handleSend(chip.text);
  };

  const formatText = (text: string) => {
    const parts = text.split(/\s+/);
    return parts.map((part, idx) => {
      if (/^https?:\/\//i.test(part)) {
        return (
          <a key={idx} href={part} target="_blank" rel="noreferrer" className="text-[#004A99] underline">
            {part}{" "}
          </a>
        );
      }
      if (/^\+?\d[\d\-\s()]{8,}$/.test(part)) {
        const tel = part.replace(/[^\d+]/g, "");
        return (
          <a key={idx} href={`tel:${tel}`} className="text-[#004A99] underline">
            {part}{" "}
          </a>
        );
      }
      return <span key={idx}>{part} </span>;
    });
  };

  const whatsappNumber = contactInfo.whatsappNumber.replace("+", "");

  if (!isChatOpen) return null;

  return (
    <div className="fixed right-0 bottom-0 md:right-5 md:bottom-5 w-full md:w-[320px] max-w-[100vw] h-[90vh] md:h-[440px] bg-white border border-[#d9d9d9] shadow-[0_8px_25px_rgba(0,0,0,0.18)] z-[10000] rounded-t-[16px] md:rounded-[12px] flex flex-col">
      <div className="bg-[#004A99] text-white py-2.5 px-4 rounded-t-[12px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold whitespace-nowrap">Sasidhar Assistant</span>
          <button
            onClick={() => {
              void changeLanguage("en");
            }}
            className={`px-2 py-1 rounded-full text-xs border ${
              language === "en" ? "bg-white text-[#004A99] border-white" : "bg-transparent text-white border-white/60"
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              void changeLanguage("te");
            }}
            className={`px-2 py-1 rounded-full text-xs border ${
              language === "te" ? "bg-white text-[#004A99] border-white" : "bg-transparent text-white border-white/60"
            }`}
          >
            తెలుగు
          </button>
        </div>
        <div className="flex items-center">
          <button onClick={closeChat} className="text-white cursor-pointer text-lg hover:opacity-80" aria-label="Close chat">
            ×
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-grow overflow-y-auto px-3 py-3 space-y-3 text-sm bg-[#f8fafc]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-2xl px-3 py-2 ${msg.from === "user" ? "bg-[#004A99] text-white ml-auto" : "bg-white text-[#1f2937] border border-[#e5e7eb]"}`}
          >
            {formatText(msg.text)}
          </div>
        ))}

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <button
                key={`${chip.text}-${i}`}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1 rounded-full border border-[#004A99] text-[#004A99] text-xs bg-white hover:bg-[#eef4fb] transition"
              >
                {chip.text}
              </button>
            ))}
          </div>
        )}

        {loading && <div className="text-xs text-[#475569]">Typing...</div>}

        {!endpoint && (
          <div className="text-xs text-red-600">Chat is not configured. Please set VITE_DFCX_API_BASE_URL.</div>
        )}
      </div>

      <div className="px-3 py-3 border-t border-[#e5e7eb] bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow rounded-lg border border-[#cbd5e1] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#004A99]/40"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void handleSend();
              }
            }}
            disabled={loading || !endpoint}
          />
          <Button variant="primary" className="px-4" onClick={() => void handleSend()} disabled={loading || !endpoint || !input.trim()}>
            Send
          </Button>
        </div>
        <div className="mt-2 text-[11px] text-[#94a3b8]">
          Need quick help? WhatsApp:{" "}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="text-[#004A99] underline">
            {contactInfo.whatsappNumber}
          </a>
        </div>
      </div>
    </div>
  );
};
