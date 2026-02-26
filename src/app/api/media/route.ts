import { NextResponse } from "next/server";

import { getMedia } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const limit = Number(url.searchParams.get("limit") ?? "8");

  try {
    const media = await getMedia(locale);
    const items = Array.isArray(media) ? media : [];
    const cappedLimit = Number.isFinite(limit) ? Math.max(limit, 0) : 0;
    return NextResponse.json({ data: items.slice(0, cappedLimit) });
  } catch (error) {
    console.error("Failed to load media", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
