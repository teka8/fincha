import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/lib/cms";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const locale = request.headers.get("Accept-Language") || "en";

    try {
        const data = await getPostById(locale, "news", id);
        return NextResponse.json(data);
    } catch (error) {
        console.error(`API error fetching news ${id}:`, error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
