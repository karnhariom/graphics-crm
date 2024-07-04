import { connectDb } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function POST(request: NextRequest) {
    try {
        return NextResponse.json({
            message: "asd",
            status: 500
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}