"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  sources?: string[];
};

type FaqItem = {
  question: string;
  answer: string;
  sourceId?: string;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    title: "General Information",
    items: [
      {
        question: "What does Fincha Sugar Factory produce?",
        answer:
          "We produce refined sugar, molasses, ethanol, and agro-industrial by-products that support food and energy sectors.",
        sourceId: "KB2",
      },
      {
        question: "Where is the factory located?",
        answer:
          "Fincha Sugar Factory is located in the Fincha Valley, Oromia Region, Ethiopia.",
        sourceId: "KB1",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via the Contact page or submit an inquiry using the form on our website.",
        sourceId: "KB5",
      },
    ],
  },
  {
    title: "Tenders & Procurement",
    items: [
      {
        question: "How do I apply for a tender?",
        answer:
          "Open a tender, review requirements, and submit your proposal before the deadline through the stated submission method.",
        sourceId: "KB3",
      },
      {
        question: "Can I submit a tender online?",
        answer:
          "If the tender submission method is marked as online, you can submit directly on the tender detail page.",
        sourceId: "KB4",
      },
      {
        question: "Where can I find tender documents?",
        answer:
          "Tender documents are listed in the Tender Documents section on each tender detail page.",
        sourceId: "KB3",
      },
    ],
  },
  {
    title: "Products & Quality",
    items: [
      {
        question: "Do you offer product specifications?",
        answer:
          "Yes. Product details and specifications are provided on the Products page.",
        sourceId: "KB2",
      },
      {
        question: "What quality standards do you follow?",
        answer:
          "We follow international quality standards and strict laboratory testing to ensure purity and consistency.",
        sourceId: "KB6",
      },
    ],
  },
];

const quickPrompts = [
  "How do I apply for a tender?",
  "Where can I download tender documents?",
  "How can I contact customer support?",
];

const greetingReplies = [
  "Hello! I can help with questions about Fincha Sugar Factory, tenders, and products. Try asking about location, products, or tenders.",
  "Hi! Ask me anything about Fincha Sugar Factory. For example: location, products, tenders, or contact support.",
];

const outOfScopeReply =
  "I can help with questions about Fincha Sugar Factory, its products, tenders, and support. Please ask a factory-related question.";

const keywordAnswers: Array<{ keywords: string[]; answer: string; sourceId?: string }> = [
  {
    keywords: ["location", "located", "where", "address"],
    answer: "Fincha Sugar Factory is located in the Fincha Valley, Oromia Region, Ethiopia.",
    sourceId: "KB1",
  },
  {
    keywords: ["contact", "support", "help", "customer service"],
    answer: "For official inquiries or customer support, use the Contact page on the Fincha website.",
    sourceId: "KB5",
  },
  {
    keywords: ["produce", "products", "manufacture", "sugar"],
    answer:
      "Fincha produces refined sugar, molasses, ethanol, and agro-industrial by-products for food and energy sectors.",
    sourceId: "KB2",
  },
  {
    keywords: ["tender", "document", "documents", "download"],
    answer:
      "Tender documents are listed in the Tender Documents section on each tender detail page.",
    sourceId: "KB3",
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text:
      "Hi! I am the Fincha Sugar Factory Assistant. Ask me anything about tenders, products, or company information. You can also click a FAQ to get an instant answer.",
  },
];

const normalize = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({ 0: true });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const faqIndex = useMemo(() => {
    const index = new Map<string, { answer: string; sourceId?: string }>();
    faqSections.forEach((section) => {
      section.items.forEach((item) => {
        index.set(normalize(item.question), { answer: item.answer, sourceId: item.sourceId });
      });
    });
    return index;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen]);

  const appendMessage = (role: ChatMessage["role"], text: string, sources?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role,
        text,
        sources,
      },
    ]);
  };

  const findFaqAnswer = (question: string) => {
    const normalized = normalize(question);
    const direct = faqIndex.get(normalized);
    if (direct) return direct;
    for (const [key, value] of faqIndex.entries()) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return value;
      }
    }
    for (const item of keywordAnswers) {
      if (item.keywords.some((keyword) => normalized.includes(keyword))) {
        return { answer: item.answer, sourceId: item.sourceId };
      }
    }
    return null;
  };

  const isGreeting = (text: string) =>
    /^(hi|hello|hey|good morning|good afternoon|good evening|selam|salaam|salam)\b/.test(normalize(text));

  const isOutOfScope = (text: string) =>
    /(money|loan|finance|bank|investment|crypto|lottery|bet|betting|gambling|cash)/.test(normalize(text));

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;
    const history = messages.slice(-5).map((m) => ({ role: m.role, text: m.text }));
    appendMessage("user", question);
    if (isGreeting(question)) {
      appendMessage("assistant", greetingReplies[Math.floor(Math.random() * greetingReplies.length)]);
      return;
    }
    if (isOutOfScope(question)) {
      appendMessage("assistant", outOfScopeReply);
      return;
    }
    const faqAnswer = findFaqAnswer(question);
    if (faqAnswer) {
      appendMessage("assistant", faqAnswer.answer, faqAnswer.sourceId ? [faqAnswer.sourceId] : undefined);
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      if (!res.ok) throw new Error("Chat request failed");
      const data = (await res.json()) as { message?: string; sources?: string[] };
      appendMessage(
        "assistant",
        (data.message ?? "Thanks! We will get back to you soon.").toString(),
        Array.isArray(data.sources) ? data.sources : undefined
      );
    } catch {
      appendMessage(
        "assistant",
        "Thank you for your question. For detailed or official inquiries, please use the Contact page of Fincha Sugar Factory."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;
    setInput("");
    await sendQuestion(question);
  };

  const handleFaqClick = (item: FaqItem) => {
    appendMessage("user", item.question);
    setTimeout(() => {
      appendMessage("assistant", item.answer, item.sourceId ? [item.sourceId] : undefined);
    }, 200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <div className={`transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <div className="w-[360px] max-w-[90vw] h-[560px] max-h-[80vh] rounded-[28px] shadow-[0_40px_120px_-40px_rgba(16,185,129,0.6)] border border-emerald-100 bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Fincha Assistant</p>
                <p className="text-xs text-emerald-50/90">Online support for customers</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              aria-label="Close chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative h-[calc(100%-64px)] flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Quick Help</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Ask a question or click a FAQ. We respond instantly and guide you to the right page.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendQuestion(prompt)}
                          className="px-3 py-1.5 rounded-full bg-white text-emerald-700 border border-emerald-100 text-[11px] font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <HelpCircle className="w-4 h-4" />
                  <p className="text-sm font-semibold">Frequently Asked Questions</p>
                </div>
                <div className="space-y-3">
                  {faqSections.map((section, index) => {
                    const isExpanded = !!expandedSections[index];
                    return (
                      <div key={section.title} className="border border-slate-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() =>
                            setExpandedSections((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 text-left"
                        >
                          <span className="text-sm font-semibold text-slate-800">{section.title}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 py-3 space-y-2">
                            {section.items.map((item) => (
                              <button
                                key={item.question}
                                onClick={() => handleFaqClick(item)}
                                className="w-full text-left text-sm text-emerald-700 hover:text-emerald-900 font-medium"
                              >
                                {item.question}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4" />
                  <p className="text-sm font-semibold">Conversation</p>
                </div>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          message.role === "user"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {message.text}
                        {message.sources && message.sources.length > 0 && (
                          <span className={`block mt-2 text-[10px] ${message.role === "user" ? "text-emerald-50/90" : "text-slate-500"}`}>
                            Sources: {message.sources.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm bg-slate-100 text-slate-600">
                        Typing...
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!isSending) {
                        handleSend();
                      }
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="h-11 px-4 rounded-2xl bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                This assistant provides quick guidance. For official inquiries, use the Contact page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto mt-4 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-[0_18px_50px_-18px_rgba(16,185,129,0.9)] flex items-center justify-center hover:bg-emerald-600 transition-colors"
        aria-label="Open chatbot"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
