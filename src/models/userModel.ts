import { generateUsername, hashPassword } from "@/helpers/helper";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already in use"]
    },
    company: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already in use"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    pincode: { type: String },
    is_verified: {
        type: Boolean,
        default: false
    },
    passwordVerifyToken: { type: String },
    isDeleted: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: {
        type: String,
        enum: [
            "user", "admin"
        ],
        default: "user",
        required: true,
    },
},
    { timestamps: true })

const User = mongoose.models.users || mongoose.model("users", userSchema)

User.exists({
    email: `crmadmin@yopmail.com`,
}).then(async (data) => {
    if (!data) {
        await User.create({
            name: "Super Admin",
            username: await generateUsername("crmadmin@yopmail.com"),
            email: `crmadmin@yopmail.com`,
            password: await hashPassword("Super@1234"),
            phone: "+919898989898",
            role: "admin",
            company: "Graphics Crm",
        })
            .then((data) => {
                console.log('data: ', data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

export default User