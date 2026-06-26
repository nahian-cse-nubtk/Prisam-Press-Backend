import { Request, Response } from "express"
import status from "http-status"
import { userServices } from "./user.service"

const registerUser=async(req:Request, res:Response)=>{

    try{
        const user = await userServices.registerUserIntoDB(req.body)

        res.status(status.CREATED).json({
            success: true,
            statusCode: status.CREATED,
            message: "User register successfully",
            data: {
                user
            }
        })
    }
    catch(error:any){
        console.log(error)
        res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message
        })
    }



}

export const userController={
    registerUser
}