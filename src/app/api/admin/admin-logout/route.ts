import { connectDb } from "@/config/dbConfig";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function POST(req: NextRequest, res: NextResponse) {
    const authResponse: any = await checkAuthAdmin(req, res);

    if (authResponse.status !== 200) {
        return authResponse;
    }

    try {
        return NextResponse.json({
            message: "User Logged Out",
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
