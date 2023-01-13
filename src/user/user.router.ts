import express  from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service";
import { json } from "stream/consumers";


export const userRouter = express.Router();

// Get LIst of All Users
userRouter.get("/", async(request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: Single User By ID
userRouter.get("/:id", async(request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try{
    const user = await UserService.getUser(id);
    if (user) {
      return response.status(200).json(user);
    }
    return  response.status(500).json("User could not be found");
  }catch(error: any){
    return response.status(500).json(error.message);
  }
});

// POST : Create a User
// params: email, username
userRouter.post("/",
body("email").isString(),
body("username").isString(),
async(request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try{
    const user = request.body;
    const newUser = await UserService.createUser(user);
    return response.status(200).json(newUser);
  }catch(error: any){
    return response.status(400).json(error.message)
  }
});

// PUT: Update User
// Params: username, email

userRouter.put(
  "/:id",
  body("email").isString(),
  body("username").isString(),
  async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(request.params.id, 10);
    try {
      const user = request.body;
      const updatedUser = await UserService.updateUser(user, id);
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)

// DELETE: Delete an user based on the id

userRouter.delete("/:id",async (request:Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await UserService.deleteUser(id);
    return response.status(200).json("User has been successfully deleted");
  } catch (
    error: any
  ) {
    return response.status(500).json(error.message);
  }
})