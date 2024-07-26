import Token from "@/models/token";
import { sign } from "jsonwebtoken";
import { randomKey, randomToken, randomiv } from "./helper";
import CryptoJS from "crypto-js";

export const createToken = async (payload: Object) => {
    try {
        const token = sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn: process.env.JWT_EXPIRE_TIME,
            issuer: process.env.JWT_ISSUER,
        });
        const key = await randomKey();
        const iv = await randomiv();
        const newToken = await randomToken();
        const encrypted = CryptoJS.AES.encrypt(token, key, { iv: iv });
        const msg = encrypted.toString();
        await Token.create({
            tokenable_type: "jwt",
            tokenable_id: newToken,
            name: "bearer",
            token: msg,
            key: key,
            iv: iv,
        }).catch((err) => {
            console.log(err);
        });
        return newToken;
    } catch (err) {
        console.log(err);
    }
};

export const deleteToken = async (token: String) => {
    try {
        Token.deleteMany({ tokenable_id: token }).then((data) => {
            if (!data) {
                throw "Data not found";
            } else {
                return true;
            }
        });
    } catch (err) {
        console.log(err);
    }
};