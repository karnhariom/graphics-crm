import { connectDb } from "@/config/dbConfig";
import { handleFileUpload } from "@/helpers/helper";
import { handleCategoryImgUpload } from "@/helpers/multer";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import Category from "@/models/categoryModel";
import { writeFile } from "fs/promises";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


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
        const categoryImage = reqBody.get("categoryImage")
        const { host } = req.nextUrl

        const fileurl = await handleFileUpload(categoryImage, host)

        const category = await Category.findOne({ categorySlug })
        if (category) {
            return NextResponse.json({
                message: "Category already exists!",
                status: 400
            })
        }

        const newCategory = new Category({
            title,
            categoryImage: fileurl,
            categorySlug
        })

        const savedCategory = await newCategory.save()

        return NextResponse.json({
            message: "Category created successfully!",
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}