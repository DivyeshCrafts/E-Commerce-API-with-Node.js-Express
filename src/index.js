import "dotenv/config"
import {app} from "./app.js"
import {dbConnect} from "./database/databaseConnection.js"
const PORT = process.env.PORT || 8000

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongodb connection error", error)
    process.exit(1)
})