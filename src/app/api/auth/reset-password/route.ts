import { connectDb } from "@/config/dbConfig"
import { checkPassword, hashPassword, minutes } from "@/helpers/helper";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types"
import { NextResponse } from "next/server";

connectDb()

export const POST = async (request: CustomNextRequest) => {
    try {
        const reqBody = await request.json();
        const { verifyToken, password } = reqBody;
        const user: any = await User.findOne({ passwordVerifyToken: verifyToken })
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 400
            });
        }
        const isAble = await minutes(user.updatedAt) <= 10
        if (user && !isAble) {
            return NextResponse.json({
                message: "Reset token expired",
                status: 400
            });
        }
        const passwordMatch = await checkPassword(password, user.password)
        if (passwordMatch) {
            return NextResponse.json({
                message: "New Password should not same as old password!"
            });
        }

        const newPassword = await hashPassword(password);

        user.password = newPassword
        user.passwordVerifyToken = null

        await user.save()

        return NextResponse.json({
            message: "Password reset successfull"
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        });
    }

}