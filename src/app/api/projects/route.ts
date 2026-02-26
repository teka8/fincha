import { NextResponse } from "next/server";

import { getProjects } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const limit = Number(url.searchParams.get("limit") ?? "3");

  try {
    const projects = await getProjects(locale, new URLSearchParams({ per_page: String(limit) }));
    return NextResponse.json({ data: projects.data.slice(0, Math.max(limit, 0)) });
  } catch (error) {
    console.error("Failed to load projects", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
