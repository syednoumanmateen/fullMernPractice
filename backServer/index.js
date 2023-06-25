import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

import User from './models/User.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/OverallStat.js'
import AffiliateStat from './models/AffiliatedStat.js'
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat,dataAffiliateStat } from './data/index.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

const port = process.env.PORT || 8000
const db = process.env.MONGO_URL

mongoose.connect(db).then(() => {
    app.listen(port, () => console.log(`server port:${port}`))
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
}).catch(error => console.log(`${error} did not connect`))