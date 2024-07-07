import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import Product from "@/models/productModel";

connectDb();

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        let products;

        if (category) {
            products = await Product.find({ categories: category, isDeleted: false });
        } else {
            products = await Product.find({ isDeleted: false });
            console.log("products: ", products)
        }

        return NextResponse.json({
            success: true,
            products
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
