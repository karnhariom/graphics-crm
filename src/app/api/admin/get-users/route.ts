import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";

connectDb();

export async function GET(req: NextRequest, res: NextResponse) {
    const authResponse: any = await checkAuthAdmin(req, res);

    if (authResponse.status !== 200) {
        return authResponse;
    }
    try {
        const userList = await User.find({ isDeleted: false });
        return NextResponse.json({
            success: true,
            data: userList
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
