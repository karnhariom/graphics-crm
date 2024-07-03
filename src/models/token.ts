import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        tokenable_type: {
            type: String,
            required: true,
        },
        tokenable_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        iv: {
            type: String,
            required: true,
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);
const Token = mongoose.models.tokens || mongoose.model("tokens", tokenSchema)

export default Token;
