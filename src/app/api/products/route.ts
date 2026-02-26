import { NextResponse } from "next/server";

import { getFeaturedProducts } from "@/lib/cms";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const limit = Number(url.searchParams.get("limit") ?? "3");

  try {
    const products = await getFeaturedProducts(locale);
    return NextResponse.json(products.slice(0, Math.max(limit, 0)));
  } catch (error) {
    console.error("Failed to load products", error);
    return NextResponse.json([], { status: 500 });
  }
}
