import { db }  from "../utils/db.server";

export type User = {
  id: number;
  email: string;
  username: string;
}


export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true
    }
  });
}


export const getUser = async(id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id
    }
  });
};

export const createUser = async(user: Omit<User, "id">): Promise<User> => {
  const { email, username} = user;
  return db.user.create({
    data: {
      email,
      username
    },
    select: {
      id: true,
      email: true,
      username: true,      
    }
  })
}

export const updateUser = async(user: Omit<User, "id">, id: number): Promise<User> => {
  const { email, username } = user;
  return db.user.update({
    where: {
      id,
    },
    data :{
      email,
      username
    },
    select:{
      id: true,
      email: true,
      username: true
    }
  });
}

export const deleteUser = async(id: number): Promise<void> => {
  await db.user.delete({
    where: {
      id
    }
  });
}