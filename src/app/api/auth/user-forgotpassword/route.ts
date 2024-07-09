import { connectDb } from "@/config/dbConfig";
import { randomToken } from "@/helpers/helper";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 400,
            });
        }
        const passwordResetToken = await randomToken();

        const passwordResetTokenExpiry = Date.now() + 3600000;

        user.passwordVerifyToken = passwordResetToken;
        user.passwordVerifyTokenExpiry = passwordResetTokenExpiry;

        await user.save();

        return NextResponse.json({
            message: "Password reset token generated successfully",
            status: 200,
            token: passwordResetToken, 
            expiresIn: passwordResetTokenExpiry
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        });
    }
}
