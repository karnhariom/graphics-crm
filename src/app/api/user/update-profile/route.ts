import { connectDb } from "@/config/dbConfig";
import { checkAuthUser } from "@/middlewares/checkAuthUser";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

connectDb()

export async function PUT(req: CustomNextRequest, res: NextResponse) {
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
        if(!user){
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }
        
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