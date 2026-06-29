import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from './../../middlewares/auth';
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",auth(Role.admin,Role.author,Role.user),postController.createPost)
router.get("/",postController.getAllPosts)
router.get("/stats",auth(Role.admin),postController.getPostStats)
router.get("/my-posts",auth(Role.admin,Role.author,Role.user),postController.getMyPosts)
router.get("/:postId",postController.getPostById)
router.patch("/:postId",auth(Role.admin,Role.author,Role.user),postController.updatePost)
router.delete("/:postId",auth(Role.admin,Role.author,Role.user),postController.deletePost)


export const postRouter = router;