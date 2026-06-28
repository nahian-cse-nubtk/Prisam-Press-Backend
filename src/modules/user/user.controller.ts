import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User Registration Successful",
    data: { user },
  });
});
const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{



    const profile = await userServices.getMyProfileFromDB(req.user.id)

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User Profile Fetched",
      data: { profile },
    })
})
const updateProfile = catchAsync(async(req:Request,res:Response,)=>{

  const updateProfile = 

})
export const userController = {
  registerUser,
  getMyProfile,
  updateProfile
};
