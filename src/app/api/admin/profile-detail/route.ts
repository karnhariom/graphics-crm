import { connectDb } from "@/config/dbConfig";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function GET(req: NextRequest, res: NextResponse) {
    const adminResponse: any = await checkAuthAdmin(req, res);

    if (adminResponse.status !== 200) {
        return adminResponse;
    }
    try {
        const admin = await User.findOne({
            _id: new mongoose.Types.ObjectId(req.id),
            role: "admin",
            isDeleted: false,
        })
        return NextResponse.json({
            message: "User successfully retrieved",
            status: 200,
            admin
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}