import User from "@/models/userModel";
import { compareSync, hashSync } from "bcryptjs";
import CryptoJS from "crypto-js";

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
            console.log("Default admin already exists.");
            return
        }
    } catch (error) {
        console.error("Error creating default admin:", error);
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