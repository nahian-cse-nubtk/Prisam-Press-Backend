import { Request, Response } from "express"
import status from "http-status"
import { userServices } from "./user.service"
import { catchAsync } from "../utils/catchAsync"

const registerUser=catchAsync(async(req:Request, res:Response)=>{

        const user = await userServices.registerUserIntoDB(req.body)

        res.status(status.CREATED).json({
            success: true,
            statusCode: status.CREATED,
            message: "User register successfully",
            data: {
                user
            }
        })
})

export const userController={
    registerUser
}