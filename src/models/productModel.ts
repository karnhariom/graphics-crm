import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    category: mongoose.Schema.Types.ObjectId;
    categories: mongoose.Schema.Types.ObjectId[];
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
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"]
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
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
