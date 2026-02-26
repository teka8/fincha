import { NextResponse } from "next/server";

import { getNavigation } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";

  try {
    const navigation = await getNavigation(locale);
    return NextResponse.json({ data: navigation });
  } catch (error) {
    console.error("Failed to load navigation", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
