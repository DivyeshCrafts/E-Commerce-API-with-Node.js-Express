import express from "express"
const app = express()
import helmet from "helmet"
import cookieParser from "cookie-parser"

// common middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(helmet())
app.use(cookieParser())


//route import
import { router as userRouter } from "./routes/user.route.js";
import { router as productRouter } from "./routes/product.route.js";


//user route
app.use("/api/v1/users", userRouter)

//product route
app.use("/api/v1/product", productRouter)
export {app}