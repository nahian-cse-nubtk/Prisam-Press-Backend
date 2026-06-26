import { error } from "node:console";
import { prisma } from "../lib/prisma";
import { RegisterUserPayload } from "./user.interface"
import bcrypt from "bcryptjs";
import config from "../config";

const registerUserIntoDB = async(payload:RegisterUserPayload)=>{
    const {name,email,password,profilePhoto,bio} = payload;

     const isUserExist = await prisma.user.findUnique({
        where:{email}
     })
     if(isUserExist){
        throw new Error("User Already Exists")
     }
     const hashPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_round))


}

export const userServices={
    registerUserIntoDB
}