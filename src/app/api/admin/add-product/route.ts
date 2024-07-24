import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import Product from "@/models/productModel";
import Category from "@/models/categoryModel";
import mongoose from "mongoose";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import { handleFileUpload } from "@/helpers/helper";

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
        const reqBody: any = await req.formData()
        const title = reqBody.get("title");
        const description = reqBody.get("description");
        const price = reqBody.get("price");
        const category = (reqBody.get("category"));
        console.log('category: ', category);
        const productImage = reqBody.get("productImage");
        const slug = reqBody.get("slug");
        const { host } = req.nextUrl;
        const fileUrl = await handleFileUpload(productImage, host);
        

        const newProduct = new Product({
            title,
            description,
            price,
            category: new mongoose.Types.ObjectId(category),
            productImage: fileUrl,
            slug
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json({
            message: "Product created successfully!",
            success: true,
            savedProduct
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500 });
    }
}
