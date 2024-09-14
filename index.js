import express from 'express'
import { configDotenv } from 'dotenv'
import { connectDb } from './config/db.js'
import { adminRouter } from './router/adminRouter.js'
import { userRouter } from './router/userRouter.js'

configDotenv()
const app = express()
const port = process.env.PORT || 3002
app.use(express.json())
connectDb()
app.use(adminRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

