import { db } from "../utils/db.server";
import type { User } from "../user/user.service";

type PostRead = {
  id: number;
  content: string;  
  author: User;  
};

type PostWrite = {
  id: number;
  content: string;
  authorId: number;
};


export const listPosts = async (): Promise<PostRead[]> => {
  return db.post.findMany({
    select: {
      id: true,
      content: true,
      author: {
        select :{
          id: true,
          username: true,
          email: true
        }
      }
    }
  });
}
