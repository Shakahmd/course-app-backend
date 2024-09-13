import mongoose from "mongoose";
import colors from 'colors'

export const connectDb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDb is connected ${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}