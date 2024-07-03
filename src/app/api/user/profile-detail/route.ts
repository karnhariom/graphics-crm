import { connectDb } from "@/config/dbConfig";
import { checkAuth } from "@/helpers/checkAuth";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        console.log('url: ', url);
        const userId = url.searchParams.get("id");
        console.log('userId: ', userId);
        const a = await checkAuth.Admin
        console.log('a: ', a);
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