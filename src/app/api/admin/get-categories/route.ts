import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import Category from "@/models/categoryModel";

connectDb();

async function buildCategoryTree(parentCategory = null) {
    const categories = await Category.find({ parentCategory, isDeleted: false });

    return Promise.all(categories.map(async (category) => {
        const children: any = await buildCategoryTree(category._id);
        return {
            ...category._doc,
            children
        };
    }));
}

export async function GET(req: NextRequest) {
    try {
        const categoryList = await buildCategoryTree();
        
        
        return NextResponse.json({
            success: true,
            categoryList
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
