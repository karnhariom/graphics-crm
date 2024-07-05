import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Category title is required"]
    },
    categorySlug: {
        type: String,
        require: [true, "Slug is required"],
        unique: [true, "Already category exists"]
    },
    categoryImage: {
        type: String,
        require: [true, "Category image is required"]
    },
    isDeleted: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
)

const Category = mongoose.models.categories || mongoose.model("categories", categorySchema)

export default Category