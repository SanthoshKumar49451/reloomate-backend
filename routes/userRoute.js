import express from 'express'
import { register,login, profile, getOnboardingContent } from '../controllers/userControllers.js'
import authMiddleware from '../middleware/authMiddleware.js'
const userRouter=express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/profile',authMiddleware,profile)
userRouter.get('/getonboard',getOnboardingContent)


export default  userRouter