import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"
import getCountryIso3 from "country-iso-2-to-3"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: "productstats",
                    localField: "_id",
                    foreignField: "productId",
                    as: "productStats"
                }
            },
            {
                $unwind: "$productStats"
            }
        ])
        res.status(200).json(products)

        // const products = await Product.find()
        // const productsWithStats = await Promise.all(
        //     products.map(async (product) => {
        //         const stat = await ProductStat.find({
        //             productId: product._id
        //         })
        //         return {
        //             ...product._doc,
        //             stat
        //         }
        //     })
        // )

        // res.status(200).json(productsWithStats)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const { role } = req.query
        const customers = await User.find(role ? { role } : {}).select("-password")

        res.status(200).json(customers)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getTransactions = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        })

        res.status(200).json({
            transactions
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGeography = async (req, res) => {
    try {
        const users = await User.find()
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryIso3 = getCountryIso3(country)
            if (!acc[countryIso3]) {
                acc[countryIso3] = 0
            }
            acc[countryIso3]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return { id: country, value: count }
        })

        res.status(200).json(formattedLocations)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}