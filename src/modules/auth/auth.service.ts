import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ICredentials } from "./auth.interface";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { JwtUtils } from "../../utils/jwt";

const loginUserIntoDB = async (payload: ICredentials) => {

  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = JwtUtils.createToken(jwtPayload as JwtPayload,config.jwt_access_secret as string,config.jwt_access_expires_In as string)
  const refreshToken = JwtUtils.createToken(jwtPayload as JwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expires_In as string)
  return {accessToken,refreshToken};
};
const refreshToken = async(token:string)=>{

    const verifiedToken = JwtUtils.verifyJwtToken(token,config.jwt_refresh_secret as string)

    if(!verifiedToken.success){
      throw new Error(verifiedToken.error)
    }
    const {id} =verifiedToken.data as JwtPayload;
    const user = await prisma.user.findUniqueOrThrow({
      where:{id}
    })

    if(user.activeStatus === "BLOCKED"){
      throw new Error("User is blocked");
    }

    const jwt_payload ={
      id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    const accessToken = JwtUtils.createToken(jwt_payload,config.jwt_access_secret as string,config.jwt_access_expires_In as string )
    return {accessToken}

}
export const authService = {
  loginUserIntoDB,
  refreshToken
};
