import { commentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";


const createPost = async(payload:ICreatePostPayload,userId:string)=>{
    const result = await prisma.post.create({
        data:{
            ...payload,
            authorId: userId,
        }
    })
    return result;
}

const getAllPosts = async()=>{
    const result = await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password: true
                }
            },
            comment:true
        }

    })
    return result;
}

const getPostById = async(postId:string)=>{
    const transectionResult = await prisma.$transaction(
        async(tx)=>{
            await tx.post.update({
                where:{id:postId},
                data:{
                    views:{
                        increment: 1
                    }
                }
            })
            const post = await tx.post.findUniqueOrThrow({
                where:{id:postId},
                include:{
                    author:{
                        omit:{
                            password: true
                        }
                    },
                    comment: {
                        where:{
                            status: commentStatus.Approved
                        },
                        orderBy:{
                            createdAt: "desc"
                        }
                    }
                }
            })
            return post;
        }
    )
    return transectionResult;
}


export const postService ={
    createPost,
    getAllPosts,
    getPostById
}