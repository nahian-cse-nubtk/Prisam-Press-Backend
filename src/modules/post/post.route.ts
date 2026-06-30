import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from './../../middlewares/auth';
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",auth(Role.admin,Role.author,Role.user),postController.createPost)
//done
router.get("/",postController.getAllPosts)
//done
router.get("/stats",auth(Role.admin),postController.getPostStats)
router.get("/my-posts",auth(Role.admin,Role.author,Role.user),postController.getMyPosts)
router.get("/:postId",postController.getPostById)
//done
router.patch("/:postId",auth(Role.admin,Role.author,Role.user),postController.updatePost)
//done
router.delete("/:postId",auth(Role.admin,Role.author,Role.user),postController.deletePost)


export const postRouter = router;