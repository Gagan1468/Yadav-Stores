import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockProducts";

export async function GET(req: NextRequest) {
  try {
    // Directly return mock products (no CJ API call)
    const products = MOCK_PRODUCTS.map((p) => ({
      id: String(p.id),
      name: p.name,
      image: p.image,
      price: Number(p.price),
      sku: p.sku,
    }));

    return NextResponse.json({
      products,
      pageSize: 12,
      pageNumber: 1,
      totalRecords: products.length,
      totalPages: 1,
    });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
