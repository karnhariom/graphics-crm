import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { checkPassword } from "@/helpers/helper";
import { createToken } from "@/helpers/token";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 400
            });
        }
        if (user && user.role !== "user") {
            return NextResponse.json({
                message: "Unauthorized User",
                status: 400
            });
        }

        const validPassword = await checkPassword(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid credentials",
                status: 400
            });
        }
        const payload = { id: user._id };

        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            return NextResponse.json({
                message: "Server configuration error",
                status: 500
            });
        }

        const token = await createToken(payload)

        const jsonResponse = NextResponse.json({
            token,
            message: "Logged in successfully",
            success: true
        });

        return jsonResponse;
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
