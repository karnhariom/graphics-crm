import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    productImage: string;
    slug: string;
    description: string;
    price: number;
    category: any;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: [true, "Product title is required"]
    },
    productImage: {
        type: String,
        required: [true, "Product image is required"]
    },
    slug: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    category: {
        type: [String],
        ref: "Category",
        default: null,
    },
    isDeleted: {
        type: Boolean,
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
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
