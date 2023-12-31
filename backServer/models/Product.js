import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number
    }, {
    timestamps: true
}
)

const product = mongoose.model("Product", ProductSchema)
export default product