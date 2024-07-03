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
    // User: async (req: NextRequest, res: NextResponse) => {
    //     try {
    //         if (!req.headers.authorization) {
    //             throw {
    //                 statusCode: constants.code.unAuthorized,
    //                 msg: constants.message.reqAccessToken,
    //             };
    //         } else {
    //             const bearer = req.headers.authorization.split(" ");
    //             const bearerToken = bearer[1];

    //             Token.findOne({ tokenable_id: bearerToken })
    //                 .then((data: any) => {
    //                     if (!data) {
    //                         throw {
    //                             statusCode: constants.code.unAuthorized,
    //                             msg: constants.message.invalidAccessToken,
    //                         };
    //                     } else {
    //                         const key = CryptoJS.enc.Hex.parse(data.key);
    //                         const iv = CryptoJS.enc.Hex.parse(data.iv);
    //                         const decrypted = CryptoJS.AES.decrypt(data.token, key, {
    //                             iv: iv,
    //                         });
    //                         const token = decrypted.toString(CryptoJS.enc.Utf8);

    //                         verify(
    //                             token,
    //                             `${process.env.JWT_SECRET}`,
    //                             {
    //                                 issuer: process.env.JWT_ISSUER,
    //                             },
    //                             (err, jwt_payload: any) => {
    //                                 if (err) {
    //                                     throw {
    //                                         statusCode: constants.code.unAuthorized,
    //                                         msg: err.message,
    //                                     };
    //                                 } else {
    //                                     User.findOne({
    //                                         _id: new mongoose.Types.ObjectId(jwt_payload.id),
    //                                         role: constants.accountLevel.user,
    //                                         status: true,
    //                                         isDeleted: false,
    //                                     })
    //                                         .then((user) => {
    //                                             if (!user) {
    //                                                 throw {
    //                                                     statusCode: constants.code.unAuthorized,
    //                                                     msg: constants.message.invalidAccessToken,
    //                                                 };
    //                                             } else {
    //                                                 req.token = bearerToken;
    //                                                 req.id = user._id;
    //                                                 req.status = user.status;
    //                                                 req.department = user.departmentId
    //                                                 req.role = user.role
    //                                                 next();
    //                                             }
    //                                         })
    //                                         .catch((err) => {
    //                                             res.status(err.statusCode).json({
    //                                                 status: constants.status.statusFalse,
    //                                                 userStatus: constants.userStatus.statusFalse,
    //                                                 message: err.msg,
    //                                             });
    //                                         });
    //                                 }
    //                             }
    //                         );
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     res.status(err.statusCode).json({
    //                         status: constants.status.statusFalse,
    //                         userStatus: constants.userStatus.statusFalse,
    //                         message: err.msg,
    //                     });
    //                 });
    //         }
    //     } catch (error: any) {
    //         return NextResponse.json({
    //             message: error.message,
    //             status: 500
    //         });
    //     }
    // },
};