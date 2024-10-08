import User from "@/models/userModel";
import { compareSync, hashSync } from "bcryptjs";
import CryptoJS from "crypto-js";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });
        if (!adminExists) {
            const defaultAdmin = new User({
                name: "Default Admin",
                username: "admin",
                email: "admin@example.com",
                phone: "1234567890",
                password: "password123",
                role: "admin",
            });
            await defaultAdmin.save();
        } else {

            return
        }
    } catch (error) {

    }
};

export const hashPassword = async (password: string) => {
    const saltRounds = 15;
    return hashSync(password, saltRounds);
};

export const checkPassword = async (password: string, hash: string) => {
    return compareSync(password, hash);
};

export const generateUsername = (email: string) => {
    const split = email.trim().split("@")
    const username = `${split[0]}_${Date.now()}`
    return username
}

export const randomKey = async () => {
    const str = Array.from({ length: 64 }, () =>
        "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
    ).join("");
    const key = CryptoJS.enc.Hex.parse(str);
    return key;
};

export const randomiv = async () => {
    const str = Array.from({ length: 32 }, () =>
        "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
    ).join("");
    const iv = CryptoJS.enc.Hex.parse(str);
    return iv;
};

export const randomToken = async () => {
    const str = Array.from({ length: 48 }, () =>
        "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ".charAt(
            Math.floor(Math.random() * 62)
        )
    ).join("");

    return str;
};

export const handleFileUpload: any = async (file: any, host: string) => {
    
    if(file) {
        const buffer = Buffer.from(await file!.arrayBuffer());
        const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
        try {
            await writeFile(
                path.join(process.cwd(), "public/uploads/" + filename),
                buffer
            );
            return `http://${host}/uploads/${filename}`;
        } catch (error) {
    
            return NextResponse.json({ Message: "Failed", status: 500 });
        }
    }
}


export const minutes = async (time: string) => {
    const prevTime = new Date(time).getTime();
    const curnTime = new Date().getTime();
    const minutes = Math.round((curnTime - prevTime) / 1000 / 60);
    return minutes;
};
export const options: any = {
    autoClose: 3000,
    icon: true,
};