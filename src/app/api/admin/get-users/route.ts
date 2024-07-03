import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import User from "@/models/userModel";

connectDb();

export async function GET(request: NextRequest) {
    try {
        const userList = await User.find({ isDeleted: false });
        return NextResponse.json({
            success: true,
            contacts: userList
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
