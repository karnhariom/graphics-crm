import { connectDb } from "@/config/dbConfig";
import { checkAuthUser } from "@/middlewares/checkAuthUser";
import User from "@/models/userModel";
import { CustomNextRequest } from "@/types/types";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

connectDb();

export async function PUT(req: CustomNextRequest, res: NextResponse) {
    const userResponse: any = await checkAuthUser(req, res);
    if (userResponse.status !== 200) {
        return userResponse;
    }

    try {
        const reqBody = await req.json();
        const { name, email, company, phone, state, city, address, pincode } = reqBody;

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(req.id),
            role: "user",
            isDeleted: false,
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }

        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: req.id } });
            if (emailExists) {
                return NextResponse.json({
                    message: "Email is already in use",
                    status: 400
                });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.company = company || user.company;
        user.phone = phone || user.phone;
        user.state = state || user.state;
        user.city = city || user.city;
        user.address = address || user.address;
        user.pincode = pincode || user.pincode;

        await user.save();

        return NextResponse.json({
            message: "Detail updated successfully",
            status: 200,
            user
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
