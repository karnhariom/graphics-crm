import { connectDb } from "@/config/dbConfig";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import Category from "@/models/categoryModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


connectDb()

export const POST = async (req: NextRequest, res: NextResponse) => {
    const adminResponse: any = await checkAuthAdmin(req, res);
    if (adminResponse.status !== 200) {
        return adminResponse;
    }
    try {
        const reqBody = await req.json();
        const { is_delete, id } = reqBody;
        const category = await Category.findOne({ _id: new mongoose.Types.ObjectId(id) })
        
        if (!category) {
            return NextResponse.json({
                message: "Category not found",
            },{status: 400})
        }
        if(category.isDefault){
            return NextResponse.json({
                message: "Can't delete default",
            },{status: 400})
        }
        if (!is_delete) {
            return NextResponse.json({
                message: "Invalid type",
            }, {status: 400})
        }

        await Category.updateMany({ parentCategory: new mongoose.Types.ObjectId(id) }, { parentCategory: null })

        category.isDeleted = true
        await category.save()
        return NextResponse.json({
            message: "Category deleted successfully",
        }, {status: 200})
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, {status: 500});
    }
}