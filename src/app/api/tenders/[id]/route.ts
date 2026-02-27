import { NextResponse } from "next/server";
import { getTenderById } from "@/lib/cms";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const { id } = await params;

  try {
    const tender = await getTenderById(locale, id);
    if (!tender) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(tender);
  } catch (error) {
    console.error("Failed to load tender", error);
    return NextResponse.json({ message: "Failed to load tender" }, { status: 500 });
  }
}
