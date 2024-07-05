import { connectDb } from "@/config/dbConfig";
import { checkAuthUser } from "@/middlewares/checkAuthUser";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function GET(req: NextRequest, res: NextResponse) {
    const userResponse: any = await checkAuthUser(req, res);

    if (userResponse.status !== 200) {
        return userResponse;
    }
    try {
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(req.id),
            role: "user",
            isDeleted: false,
        })
        return NextResponse.json({
            message: "User successfully retrieved",
            status: 200,
            user
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}