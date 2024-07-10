import { connectDb } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        NextResponse.json({
            message: "User Logged Out",
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        })
    }

}