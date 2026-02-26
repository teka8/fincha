import { NextRequest, NextResponse } from "next/server";
import { getAnnouncements } from "@/lib/cms";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || request.headers.get("Accept-Language") || "en";

    try {
        const data = await getAnnouncements(locale, searchParams);
        return NextResponse.json(data);
    } catch (error) {
        console.error("API error fetching announcements:", error);
        return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
    }
}
