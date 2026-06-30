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
     const result = await postService.getPostsStats();

     sendResponse(res,{
      success: true,
      statusCode: status.OK,
      message: "Statistics retrieved successfully",
      data: result
     })
})

const getMyPosts = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const authorId = req.user.id;

     const result = await postService.getMyPost(authorId);

     sendResponse(res,{
      success: true,
      statusCode: status.OK,
      message:"My posts retrieved successfully",
      data: result
     })
})
const getPostById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
          const id = req.params.postId;

          const result = await postService.getPostById(id as string)

          sendResponse(res,{
            success: true,
            statusCode: status.OK,
            message: "The post is retrieved successfully",
            data: result
          })
})
const updatePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const postId = req.params.postId;
        const authorId = req.user?.id;
        const payload = req.body;

        if(!postId){
         throw new Error("Post id is required")
        }
        const result = await postService.updatePost(postId as string,payload,authorId as string)

        sendResponse(res,{
         success: true,
         statusCode: status.OK,
         message: "Post update successful",
         data: result
        })
})
const deletePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
           const postId = req.params.postId;

           const authorId = req.user.id;

           if(!postId){
            throw new Error("Post id is required in params");
           }

           await postService.deletePost(postId as string,authorId as string)

           sendResponse(res,{
            success: true,
            statusCode: status.OK,
            message: "Post deleted successfully",
            data: null
           })
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