import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/dbConfig";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel";
import { checkAuthUser } from "@/middlewares/checkAuthUser";

connectDb();

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    const userResponse: any = await checkAuthUser(req, res);
    
    if (userResponse.status !== 200) {
        return userResponse;
    }
    
    try {
        const reqBody = await req.json();
        const { productId, quantity } = reqBody;
        const userId = req.id;

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                message: "Product not found",
                status: 404
            });
        }

        let cart: any = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if product is already in cart
        const itemIndex: any = cart.items.findIndex((item: any) => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity if product is already in cart
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.items.push({ product: productId, quantity });
        }

        const savedCart = await cart.save();

        return NextResponse.json({
            message: "Product added to cart successfully!",
            success: true,
            cart: savedCart
        });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}
