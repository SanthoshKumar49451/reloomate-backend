import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import connectDb from './config/db.js';
import cors from 'cors'
import userRouter from './routes/userRoute.js';


const app=express()

app.use(cors({
    origin:process.env.FRONTEND_URL
}))
app.use(express.json())

app.use('/api',userRouter)

app.get('/',(req,res)=>{
    res.send("hello")
})




connectDb()
.then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log("connected")
    })
})