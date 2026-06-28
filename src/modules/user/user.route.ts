import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.registerUser);
router.get("/me",auth(Role.admin,Role.author,Role.user), userController.getMyProfile)
router.put("/update-Profile",auth(Role.admin,Role.user,Role.author),userController.updateProfile)

export const userRouter = router;
