import { NextRequest, NextResponse } from "next/server";
import { getAnnouncementById } from "@/lib/cms";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || request.headers.get("Accept-Language") || "en";

    try {
        const data = await getAnnouncementById(locale, id);
        return NextResponse.json(data);
    } catch (error) {
        console.error(`API error fetching announcement ${id}:`, error);
        return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
    }
}
