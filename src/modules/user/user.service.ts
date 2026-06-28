import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto, bio } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("User Already Exists");
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto,
          bio,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: createdUser.id },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
  return user;
};
const getMyProfileFromDB = async (tokenData: { id: string }) => {

  const user = await prisma.user.findUniqueOrThrow({
     where:{id: tokenData.id},
     omit:{
        password:true,
     },
     include:{
      profile: true
     }
  })
  return user;
};
export const userServices = {
  registerUserIntoDB,
  getMyProfileFromDB,
};
