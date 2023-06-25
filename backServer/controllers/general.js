import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const login = async (req, res) => {
    const { email } = req.query

    try {
        const user = await User.findOne({ email: email })

        res.status(200).json({ message: "Login Successfully", id: user._id, role: user.role })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getDashboardStat = async (req, res) => {
    try {
        const { month, year, date } = req.query

        const currentMonth = month;
        const currentYear = year;
        const currentDay = date;

        const transactions = await Transaction.find().limit().sort({ createdOn: -1 })

        const overAllStat = await OverallStat.find({ year: currentYear })

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            dailyData,
            salesByCategory
        } = overAllStat[0]

        const thisMonthStats = overAllStat[0].monthlyData.filter(({ month }) => month === currentMonth)

        const thisTodayStats = overAllStat[0].dailyData.filter(({ date }) => date === currentDay)

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            dailyData,
            salesByCategory,
            thisMonthStats,
            thisTodayStats,
            transactions
        })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}