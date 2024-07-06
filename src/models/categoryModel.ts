import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    categorySlug: {
        type: String,
        required: [true, "Slug is required"],
        unique: [true, "Category already exists"]
    },
    categoryImage: {
        type: String,
        required: [true, "Category image is required"]
    },
    parentCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
        default: null 
    },
    isDeleted: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    updatedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    deletedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
},
{ 
    timestamps: true 
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
