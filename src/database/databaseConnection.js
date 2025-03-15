import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"


const dbConnect = async ()=>{
    try {
        const dbConnected = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`Mongodb connected, host: ${dbConnected.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error", error)
        process.exit(1)
    }
}

export {dbConnect}