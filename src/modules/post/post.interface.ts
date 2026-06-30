import { postStatus } from '../../../generated/prisma/enums';


export interface ICreatePostPayload{


    title:string;
    content:string;
    thumbnail?: string;
    isFeatured?:boolean;
    status?: postStatus;
    tags?: string[];
}

export interface IUpdatePost{

    title?:string;
    content?:string;
    thumbnail?: string;
    isFeatured?:boolean;
    status?: postStatus;
    tags?: string[];
}