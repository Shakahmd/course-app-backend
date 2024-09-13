import express from 'express'
import { configDotenv } from 'dotenv'
import { connectDb } from './config/db.js'


configDotenv()
const app = express()
const port = process.env.PORT || 3002
connectDb()

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

