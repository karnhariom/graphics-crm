import { connectDb } from "@/config/dbConfig";
import { handleFileUpload } from "@/helpers/helper";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";


connectDb()

export const config = {
    api: {
        bodyParser: false
    }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    const adminResponse: any = await checkAuthAdmin(req, res);
    if (adminResponse.status !== 200) {
        return adminResponse;
    }
    try {
        const reqBody: any = await req.formData()

        const title = reqBody.get("title")
        const categorySlug = reqBody.get("categorySlug")
        const parentCategory = reqBody.get("parentCategory")
        const categoryImage = reqBody.get("categoryImage")
        const description = reqBody.get("description")
        const { host } = req.nextUrl

        const fileurl = await handleFileUpload(categoryImage, host)

        const category = await Category.findOne({ categorySlug })
        if (category) {
            return NextResponse.json({
                message: "Category already exists!"
            }, { status: 400 })
        }

        const newCategory = new Category({
            title,
            categoryImage: fileurl,
            categorySlug,
            parentCategory: parentCategory === "" ? null : parentCategory,
            description
        })

        const savedCategory = await newCategory.save()

        return NextResponse.json({
            message: "Category created successfully!",
            success: true,
            savedCategory
        }, { status: 200, })

    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500, })
    }
}