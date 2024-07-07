import mongoose, { Document, Schema } from "mongoose";

interface ICartItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new Schema<ICart>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
