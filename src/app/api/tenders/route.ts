import { NextResponse } from "next/server";
import { getTenders } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const page = url.searchParams.get("page") ?? "1";
  const perPage = url.searchParams.get("per_page") ?? "10";
  const tenderType = url.searchParams.get("tender_type");

  try {
    const params = new URLSearchParams({ page, per_page: perPage });
    if (tenderType) params.set("tender_type", tenderType);
    const result = await getTenders(locale, params);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to load tenders", error);
    return NextResponse.json(
      { data: [], meta: { current_page: 1, last_page: 1, total: 0, per_page: 10 } },
      { status: 500 }
    );
  }
}
