import { NextResponse } from "next/server";

import { getLatestPosts } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const limit = Number(url.searchParams.get("limit") ?? "3");

  try {
    const posts = await getLatestPosts(locale, limit);
    return NextResponse.json(posts.slice(0, Math.max(limit, 0)));
  } catch (error) {
    console.error("Failed to load news", error);
    return NextResponse.json([], { status: 500 });
  }
}
