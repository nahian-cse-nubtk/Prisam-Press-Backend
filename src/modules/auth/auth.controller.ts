import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";


const loginUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await authService.loginUserIntoDB(req.body)
    const { accessToken,refreshToken } = result

    res.cookie("accessToken", accessToken,{
        httpOnly: true,
        secure: false,
        sameSite:"none",
        maxAge: 1000*60*60*24

    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24*7
    })

    sendResponse(res,{
        success: true,
        statusCode: status.OK,
        message: "Login Successful",
        data: result
    })


})
const refreshToken = catchAsync(async(req:Request,res:Response)=>{

    const refreshToken = req.cookies.refreshToken

    const {accessToken} = await authService.refreshToken(refreshToken)

    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24
    })

    sendResponse(res,{
        success: true,
        statusCode: status.OK,
        message: "Token Refresh successfully",
        data: {accessToken}
    })

})

export const authController ={
    loginUser,
    refreshToken
}