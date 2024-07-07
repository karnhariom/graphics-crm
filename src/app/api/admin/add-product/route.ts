import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import Product from "@/models/productModel";
import Category from "@/models/categoryModel";
import mongoose from "mongoose";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";

connectDb();

async function getAllParentCategories(categoryId: mongoose.Schema.Types.ObjectId, categories: mongoose.Schema.Types.ObjectId[] = []): Promise<mongoose.Schema.Types.ObjectId[]> {
    const category = await Category.findById(categoryId).select("parentCategory");

    if (category) {
        categories.push(categoryId);
        if (category.parentCategory) {
            await getAllParentCategories(category.parentCategory, categories);
        }
    }

    return categories;
}

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    const adminResponse: any = await checkAuthAdmin(req, res);
    if (adminResponse.status !== 200) {
        return adminResponse;
    }

    try {
        const reqBody = await req.json();
        const { title, description, price, category } = reqBody;
        const categories = await getAllParentCategories(category);

        const newProduct = new Product({
            title,
            description,
            price,
            category,
            categories,
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json({
            message: "Product created successfully!",
            success: true,
            savedProduct
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
