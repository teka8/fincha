import { NextResponse } from "next/server";
import { getEventById } from "@/lib/cms";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const url = new URL(request.url);
    const locale = url.searchParams.get("locale") ?? "en";
    const { id } = await params;

    try {
        const event = await getEventById(locale, id);
        if (!event) return NextResponse.json(null, { status: 404 });
        return NextResponse.json(event);
    } catch (error) {
        console.error("Failed to load event", error);
        return NextResponse.json(null, { status: 500 });
    }
}
