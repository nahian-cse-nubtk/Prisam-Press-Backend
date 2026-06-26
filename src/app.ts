import { Application } from "express"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//required Middleware

const app:Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello! the prisma press server is running")
})
export default app;
