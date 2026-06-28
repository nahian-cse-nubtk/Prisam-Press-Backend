import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { JwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const auth=(...requiredRoles:Role[])=>{
     return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.cookies.accessToken?req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer")?req.headers.authorization.split(" ")[1]: req.headers.authorization

        if(!token){
            throw new Error("Your are not logged in")
        }
        const verfiedToken = JwtUtils.verifyJwtToken(token,config.jwt_access_secret as string)
        if(!verfiedToken.success){
            throw new Error(verfiedToken.error)
        }
        const {email,name,id, role} = verfiedToken.data as JwtPayload

        if(!requiredRoles.length && requiredRoles.includes(role)){
            throw new Error("Access Forbidden")
        }
        const user = await prisma.user.findUnique({
            where:{id: id}
        })
        if(!user){
            throw new Error("User not found")
        }
        // if(user.activeStatus){
        //     throw new Error("Account Blocked")
        // }
        req.user={
            id,
            name,
            email,
            role
        }
        next()
     })

}