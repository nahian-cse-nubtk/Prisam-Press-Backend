import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createPost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const id = req.user.id;
   const payload = req.body;
   const result = await postService.createPost(payload,id);
   sendResponse(res,{
    success: true,
    statusCode: status.CREATED,
    message: "Post created successfully",
    data: result
   })
})
const getAllPosts = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
         const result = await postService.getAllPosts();

         sendResponse(res,{
            success: true,
            statusCode: status.OK,
            message: "All post retrieved successfully",
            data: result
         })
})

const getPostStats = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getMyPosts = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})
const getPostById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})
const updatePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})
const deletePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

export const postController={
    createPost,
    getAllPosts,
    getPostStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
}