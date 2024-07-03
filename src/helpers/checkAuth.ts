import Token from "@/models/token";
import User from "@/models/userModel";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const checkAuth = {
    Admin: async (req: NextRequest, res: NextResponse) => {
        try {
            if (!req.headers.get("authorization")) {
                return NextResponse.json({
                    message: "Unauthorized access",
                    status: 401
                })
            } else {
                const bearer = req.headers.get("authorization")!.split(" ");
                const bearerToken = bearer[1];

                Token.findOne({ tokenable_id: bearerToken })
                    .then((data: any) => {
                        if (!data) {
                            return NextResponse.json({
                                message: "Unauthorized access",
                                status: 401
                            })
                        } else {
                            const key = CryptoJS.enc.Hex.parse(data.key);
                            const iv = CryptoJS.enc.Hex.parse(data.iv);
                            const decrypted = CryptoJS.AES.decrypt(data.token, key, {
                                iv: iv,
                            });
                            const token = decrypted.toString(CryptoJS.enc.Utf8);

                            verify(
                                token,
                                `${process.env.JWT_SECRET}`,
                                {
                                    issuer: process.env.JWT_ISSUER,
                                },
                                (err, jwt_payload: any) => {
                                    if (err) {
                                        return NextResponse.json({
                                            message: err.message,
                                            status: 401
                                        })
                                    } else {
                                        User.findOne({
                                            _id: new mongoose.Types.ObjectId(jwt_payload.id),
                                            $or: [
                                                { role: "admin" },
                                            ],
                                            status: true,
                                            isDeleted: false,
                                        })
                                            .then((user) => {
                                                if (!user) {
                                                    return NextResponse.json({
                                                        message: "Unauthorized access",
                                                        status: 401
                                                    })
                                                } else {
                                                    // req.token = bearerToken;
                                                    // req.id = user._id;
                                                    // req.status = user.status;
                                                    // req.department = user.departmentId,
                                                    //     req.role = user.role
                                                    console.log("user:", user)
                                                    return NextResponse.next()
                                                }
                                            })
                                            .catch((err: any) => {
                                                return NextResponse.json({
                                                    message: err.message,
                                                    status: 401
                                                })
                                            });
                                    }
                                }
                            );
                        }
                    })
                    .catch((error: any) => {
                        return NextResponse.json({
                            message: error.message,
                            status: 500
                        });
                    });
            }
        } catch (error: any) {
            return NextResponse.json({
                message: error.message,
                status: 500
            });
        }
    },
    User: async (req: NextRequest, res: NextResponse) => {
        try {
            if (!req.headers.get("authorization")) {
                return NextResponse.json({
                    message: "Unauthorized access",
                    status: 401
                })
            } else {
                const bearer = req.headers.get("authorization")!.split(" ");
                const bearerToken = bearer[1];

                Token.findOne({ tokenable_id: bearerToken })
                    .then((data: any) => {
                        if (!data) {
                            return NextResponse.json({
                                message: "Unauthorized access",
                                status: 401
                            })
                        } else {
                            const key = CryptoJS.enc.Hex.parse(data.key);
                            const iv = CryptoJS.enc.Hex.parse(data.iv);
                            const decrypted = CryptoJS.AES.decrypt(data.token, key, {
                                iv: iv,
                            });
                            const token = decrypted.toString(CryptoJS.enc.Utf8);

                            verify(
                                token,
                                `${process.env.JWT_SECRET}`,
                                {
                                    issuer: process.env.JWT_ISSUER,
                                },
                                (err, jwt_payload: any) => {
                                    if (err) {
                                        return NextResponse.json({
                                            message: "Unauthorized access",
                                            status: 401
                                        })
                                    } else {
                                        User.findOne({
                                            _id: new mongoose.Types.ObjectId(jwt_payload.id),
                                            role: "user",
                                            status: true,
                                            isDeleted: false,
                                        })
                                            .then((user) => {
                                                if (!user) {
                                                    return NextResponse.json({
                                                        message: "Unauthorized access",
                                                        status: 401
                                                    })
                                                } else {
                                                    // req.token = bearerToken;
                                                    // req.id = user._id;
                                                    // req.status = user.status;
                                                    // req.department = user.departmentId
                                                    // req.role = user.role
                                                    // next();
                                                    return NextResponse.next()
                                                    console.log(user)
                                                }
                                            })
                                            .catch((err) => {
                                                return NextResponse.json({
                                                    message: "Unauthorized access",
                                                    status: 401
                                                })
                                            });
                                    }
                                }
                            );
                        }
                    })
                    .catch((err) => {
                        return NextResponse.json({
                            message: "Unauthorized access",
                            status: 401
                        })
                    });
            }
        } catch (error: any) {
            return NextResponse.json({
                message: error.message,
                status: 500
            });
        }
    },
};