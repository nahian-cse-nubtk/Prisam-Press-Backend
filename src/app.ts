import { Application } from "express"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./modules/user/user.route"
import { authRouter } from "./modules/auth/auth.route"

//required Middleware

const app:Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)



app.get("/",(req,res)=>{
    res.send("Hello! the prisma press server is running")
})
export default app;
