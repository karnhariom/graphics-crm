import { checkPassword, hashPassword } from "@/helpers/helper";
import { checkAuthAdmin } from "@/middlewares/checkAuthAdmin";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: CustomNextRequest, res: NextResponse) => {
    const adminResponse: any = await checkAuthAdmin(req, res);
    if (adminResponse.status !== 200) {
        return adminResponse;
    }
    try {
        const reqBody = await req.json();
        const { old_password, new_password } = reqBody;
        if (old_password === new_password) {
            return NextResponse.json({
                status: 400,
                message: "Password should be different"
            })
        }
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(req.id),
            role: "admin",
            isDeleted: false,
        })
        if(!user){
            return NextResponse.json({
                status: 400,
                message: "User not found!"
            })
        }
        const validOldPassword = await checkPassword(old_password, user.password)
        if(!validOldPassword){
            return NextResponse.json({
                status: 400,
                message: "Invalid old password"
            })
        }
        const newPassword = await hashPassword(new_password)
        user.password = newPassword
        await user.save()
        return NextResponse.json({
            status: 200,
            message: "Password changed successfully"
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }

}