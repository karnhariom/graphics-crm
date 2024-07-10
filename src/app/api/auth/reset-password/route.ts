import { connectDb } from "@/config/dbConfig"
import { minutes } from "@/helpers/helper";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types"
import { NextResponse } from "next/server";

connectDb()

export const POST = async (request: CustomNextRequest) => {
    try {
        const reqBody = await request.json();
        const { verifyToken, password } = reqBody;
        const user: any = User.find({ passwordVerifyToken: verifyToken })
        const isAble = (await minutes(user.updatedAt)) >= 10
        console.log('isAble: ', isAble);
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500,
        });
    }

}