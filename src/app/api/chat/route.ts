import { NextResponse } from "next/server";
import OpenAI from "openai";
import { FINCHA_KNOWLEDGE_BASE } from "@/data/fincha-knowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Ensure this is set in your environment variables
});

const systemPrompt = `
You are the official AI assistant for Fincha Sugar Factory.

Rules:
- Only answer questions related to Fincha Sugar Factory.
- If a question is unrelated (politics, religion, world news, personal advice, etc.), politely refuse.
- Do not fabricate information.
- If unsure, advise the user to contact the official Contact page.
- Keep answers short, professional, and factual.

Return a JSON object with keys: answer (string) and sources (array of knowledge IDs). Do not include extra keys.
`;

const fallbackAnswer = {
  answer:
    "Thank you for your question. For detailed or official inquiries, please use the Contact page of Fincha Sugar Factory.",
  sources: [] as string[],
};

const refusalAnswer = {
  answer:
    "I am the Fincha Assistant and can only answer questions related to Fincha Sugar Factory, its products, tenders, and services. For other inquiries, please use the Contact page.",
  sources: [] as string[],
};

const allowedKeywords = [
  "fincha",
  "sugar",
  "factory",
  "company",
  "plant",
  "product",
  "products",
  "ethanol",
  "molasses",
  "tender",
  "tenders",
  "procurement",
  "bid",
  "bids",
  "document",
  "documents",
  "contact",
  "support",
  "help",
  "location",
  "located",
  "address",
];

const isRelated = (message: string) => {
  const lower = message.toLowerCase();
  return allowedKeywords.some((word) => lower.includes(word));
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: Array<{ role?: string; text?: string }>;
    };
    const message = (body?.message ?? "").toString().trim();

    if (!message) {
      return NextResponse.json(
        { message: "Please enter a question." },
        { status: 400 },
      );
    }

    if (!isRelated(message)) {
      return NextResponse.json({ message: refusalAnswer.answer, sources: [] });
    }

    const knowledgeBlock = FINCHA_KNOWLEDGE_BASE.map(
      (entry) =>
        `ID: ${entry.id}\nTitle: ${entry.title}\nContent: ${entry.content}`,
    ).join("\n\n");

    const historyBlock = Array.isArray(body.history)
      ? body.history
          .filter(
            (m) =>
              (m.role === "assistant" || m.role === "user") &&
              typeof m.text === "string",
          )
          .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
          .join("\n")
      : "";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            "User question:\n" +
            message +
            (historyBlock ? "\n\nConversation history:\n" + historyBlock : "") +
            "\n\nKnowledge base:\n" +
            knowledgeBlock,
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw = (response.choices[0]?.message?.content ?? "").trim();
    let parsed: { answer?: string; sources?: string[] } | null = null;
    try {
      parsed = JSON.parse(raw) as { answer?: string; sources?: string[] };
    } catch {
      parsed = null;
    }

    const answer = parsed?.answer?.toString().trim() || fallbackAnswer.answer;
    const sources = Array.isArray(parsed?.sources)
      ? parsed?.sources.map((s) => String(s))
      : [];

    return NextResponse.json({
      message: answer,
      sources,
    });
  } catch (error) {
    console.error("Chatbot API error", error);
    return NextResponse.json(
      { message: "We could not answer right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
