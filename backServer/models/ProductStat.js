import mongoose from "mongoose"

const ProductStatSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [{
            month: String,
            totalSales: Number,
            totalUnits: Number
        }],
        dailyData: [{
            date: String,
            totalSales: Number,
            totalUnits: Number
        }],
    }, {
    timestamps: true
}
)

const productStat = mongoose.model("ProductStat", ProductStatSchema)
export default productStat