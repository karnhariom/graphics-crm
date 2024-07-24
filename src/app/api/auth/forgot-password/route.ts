import { connectDb } from "@/config/dbConfig";
import { randomToken } from "@/helpers/helper";
import { sendMail } from "@/helpers/mail";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const POST = async (request: NextRequest) => {
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

        user.passwordVerifyToken = passwordResetToken;

        await user.save();

        const payload = {
            to: user?.email,
            title: "Forgot Password",
            data: `${process.env.MAIN}${passwordResetToken}`,
            template: "forgot-password"
        };

        await sendMail(payload);

        return NextResponse.json({
            message: "Reset link sent Successfully",
            status: 200,
            token: passwordResetToken,
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        });
    }
};
