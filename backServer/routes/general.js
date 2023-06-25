import express from 'express'
import { getUser, getUsers, getDashboardStat, login } from '../controllers/general.js'

const router = express.Router()

router.get("/login", login)
router.get("/user/:id", getUser)
router.get("/users", getUsers)
router.get("/dashboard", getDashboardStat)

export default router