import { NextResponse } from "next/server";

import { getFooter } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";

  try {
    const footer = await getFooter(locale);
    return NextResponse.json({ data: footer });
  } catch (error) {
    console.error("Failed to load footer", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
