import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    description: { type: String, },
    categorySlug: {
        type: String,
        required: [true, "Slug is required"],
        unique: [true, "Category already exists"]
    },
    categoryImage: {
        type: String,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false
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

const Category = mongoose.models.categories || mongoose.model("categories", categorySchema);

Category.exists({
    categorySlug: `uncategorized`,
}).then(async (data) => {
    if (!data) {
        await Category.create({
            title: "Uncategorized",
            categorySlug: "uncategorized",
            isDefault: true
        })
            .then((data) => {
                console.log('data: ', data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

export default Category;
