import { connectDb } from "@/config/dbConfig";
import { deleteToken } from "@/helpers/token";
import { checkAuthUser } from "@/middlewares/checkAuthUser";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

connectDb()

export async function POST(request: CustomNextRequest, response: NextResponse) {
    const authResponse: any = await checkAuthUser(request, response);

    if (authResponse.status !== 200) {
        return authResponse;
    }
    try {
        const user = await User.find({ _id: new mongoose.Types.ObjectId(request.id) })
        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 500 });
        }
        await deleteToken(request.token!);
        return NextResponse.json({
            message: "Logged Out Successfully!",
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500 })
    }

}