import { createDefaultAdmin } from "@/helpers/helper"
import mongoose from "mongoose"

export async function connectDb() {
    try {
       await mongoose.connect(process.env.MONGO_URI!)
        const connection = await mongoose.connection
        connection.on('connected', () => {
            console.log("monogDB Connected")
            createDefaultAdmin()
        })
        connection.on('error', (err) => {
            console.log("Mongo after connection error: ", err)
            process.exit()
        })
    } catch (error) {
        console.log("db connection error", error)
    }
}